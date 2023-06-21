import { Middleware } from 'redux'

type storeType = Map<any, Array<Function>>

const redLiveCallbacksStoreBefore = new Map<any, Array<Function>>()
const redLiveCallbacksStoreAfter = new Map<any, Array<Function>>()

const bindFnOnType = (actionType: string, callback: Function, store: storeType) => {
    if (!Array.isArray(store.get(actionType))) {
        store.set(actionType, [])
    }

    const actionStack = store.get(actionType)

    if (actionStack) actionStack.push(callback)
}

export const redLiveSubBefore = (actionType: string | Array<string>, callback: Function) => {
    if (Array.isArray(actionType)) {
        for (const type of actionType) {
            bindFnOnType(type, callback, redLiveCallbacksStoreBefore)
        }
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreBefore)
    }
}

export const redLiveSubAfter = (actionType: string | Array<string>, callback: Function) => {
    if (Array.isArray(actionType)) {
        for (const type of actionType) {
            bindFnOnType(type, callback, redLiveCallbacksStoreAfter)
        }
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreAfter)
    }
}

export const redLiveMiddleware: Middleware = () => next => action => {
    const afterStack = redLiveCallbacksStoreAfter.get(action.type)
    const beforeStack = redLiveCallbacksStoreBefore.get(action.type)

    if (beforeStack) {
        for (const f of beforeStack) {
            f(action)
        }
    }

    const result = next(action)

    if (afterStack) {
        for (const f of afterStack) {
            f(action)
        }
    }

    return result
}