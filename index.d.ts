declare module 'red-live' {
    import { Middleware, Dispatch, AnyAction } from 'redux'

    interface IRedLiveCallbacksStore {
        [key: string]: Array<Function>
    }

    const redLiveCallbacksStoreBefore: IRedLiveCallbacksStore
    const redLiveCallbacksStoreAfter: IRedLiveCallbacksStore

    const bindFnOnType: (actionType: string, callback: Function, store: IRedLiveCallbacksStore) => void
    
    export const redLiveSubBefore: (actionType: string | Array<string>, callback: Function) => void
    export const redLiveSubAfter: (actionType: string | Array<string>, callback: Function) => void
    export const redLiveMiddleware: Middleware<{}, any, Dispatch<AnyAction>>
}