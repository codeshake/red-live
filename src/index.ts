import { Middleware } from 'redux'

interface IRedLiveCallbacksStore {
    [key: string]: Array<Function>
}

const redLiveCallbacksStoreBefore: IRedLiveCallbacksStore = {}
const redLiveCallbacksStoreAfter: IRedLiveCallbacksStore = {}

const bindFnOnType = (actionType: string, callback: Function, store: IRedLiveCallbacksStore) => {
    if (typeof store[actionType] === 'undefined') store[actionType] = []
    store[actionType].push(callback)
}

export const redLiveSubBefore = (actionType: string | Array<string>, callback: Function) => {
    if (Array.isArray(actionType)) {
        actionType.forEach(type => bindFnOnType(type, callback, redLiveCallbacksStoreBefore))
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreBefore)
    }
}

export const redLiveSubAfter = (actionType: string | Array<string>, callback: Function) => {
    if (Array.isArray(actionType)) {
        actionType.forEach(type => bindFnOnType(type, callback, redLiveCallbacksStoreAfter))
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreAfter)
    }
}

export const redLive: Middleware = () => next => action => {
    if (typeof redLiveCallbacksStoreBefore[action.type] !== 'undefined') {
        redLiveCallbacksStoreBefore[action.type].forEach(f => f(action))
    }

    const result = next(action)

    if (typeof redLiveCallbacksStoreAfter[action.type] !== 'undefined') {
        redLiveCallbacksStoreAfter[action.type].forEach(f => f(action))
    }

    return result
}