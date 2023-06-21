import { Middleware } from 'redux'

interface IRedLiveCallbacksStore {
    [key: string]: Array<Function>
}

const redLiveCallbacksStoreBefore: IRedLiveCallbacksStore = {}
const redLiveCallbacksStoreAfter: IRedLiveCallbacksStore = {}

const bindFnOnType = (actionType: string, callback: Function, store: IRedLiveCallbacksStore) => {
    const actionStack = store[actionType]

    if (!Array.isArray(actionStack)) store[actionType] = []
    if (actionStack) actionStack.push(callback)
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

export const redLiveMiddleware: Middleware = () => next => action => {
    const afterStack = redLiveCallbacksStoreAfter[action.type]
    const beforeStack = redLiveCallbacksStoreBefore[action.type]

    if (Array.isArray(beforeStack)) {
        for (const f of beforeStack) {
            f(action)
        }
    }

    const result = next(action)

    if (Array.isArray(afterStack)) {
        for (const f of afterStack) {
            f(action)
        }
    }

    return result
}