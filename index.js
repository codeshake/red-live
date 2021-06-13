const redLiveCallbacksStoreBefore = {}
const redLiveCallbacksStoreAfter = {}

const bindFnOnType = (actionType, callback, store) => {
    if (typeof store[actionType] === 'undefined') store[actionType] = []

    store[actionType].push(callback)
}

export const redLiveSubBefore = (actionType, callback) => {
    if (Array.isArray(actionType)) {
        actionType.forEach(type => bindFnOnType(type, callback, redLiveCallbacksStoreBefore))
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreBefore)
    }
}

export const redLiveSubAfter = (actionType, callback) => {
    if (Array.isArray(actionType)) {
        actionType.forEach(type => bindFnOnType(type, callback, redLiveCallbacksStoreAfter))
    } else {
        bindFnOnType(actionType, callback, redLiveCallbacksStoreAfter)
    }
}

export const redLiveMiddleware = _ => next => action => {
    if (typeof redLiveCallbacksStoreBefore[action.type] !== 'undefined') {
        redLiveCallbacksStoreBefore[action.type].forEach(f => f(action))
    }

    const result = next(action)

    if (typeof redLiveCallbacksStoreAfter[action.type] !== 'undefined') {
        redLiveCallbacksStoreAfter[action.type].forEach(f => f(action))
    }

    return result
}