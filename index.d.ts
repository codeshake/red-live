interface IRedLiveCallbacksStore {
    [key: string]: Array<Function>
}

declare const redLiveCallbacksStoreBefore: IRedLiveCallbacksStore
declare const redLiveCallbacksStoreAfter: IRedLiveCallbacksStore

declare const bindFnOnType: (actionType: string, callback: Function, store: IRedLiveCallbacksStore) => void

declare module 'red-live' {
    import { Middleware, Dispatch, AnyAction } from 'redux'

    export const redLiveSubBefore: (actionType: string | Array<string>, callback: Function) => void
    export const redLiveSubAfter: (actionType: string | Array<string>, callback: Function) => void
    export const redLiveMiddleware: Middleware<{}, any, Dispatch<AnyAction>>
}