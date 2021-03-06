# Red Live

Simple and lightweight [middleware](https://redux.js.org/advanced/middleware) for binding to Redux actions.

[![npm version](https://img.shields.io/npm/v/red-live.svg?style=for-the-badge&logo=appveyor)](https://www.npmjs.com/package/red-live)
[![npm downloads](https://img.shields.io/npm/dm/red-live.svg?style=for-the-badge&logo=appveyor)](https://www.npmjs.com/package/red-live)

## Installation:

```bash
npm i red-live --save
```

## Usage:

#### 1) Apply in Redux [`applyMiddleware()`](https://redux.js.org/api/applymiddleware)

```js
import { redLiveMiddleware } from 'red-live'

createStore(
    rootReducer,
    applyMiddleware(
        redLiveMiddleware,
    )
)
```

#### 2) Use before/after hook-subscribers

```js
import { redLiveSubBefore, redLiveSubAfter } from 'red-live'
```

Accept two arguments:
1. Action name(s) (String or Array of strings)
2. Callable function on action (Function)

#### Example:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { redLiveMiddleware, redLiveSubBefore, redLiveSubAfter } from 'red-live'

const rootReducer = combineReducers({
    ...
})

const store = createStore(
    rootReducer,
    applyMiddleware(
        redLiveMiddleware,
    )
)

function appInitBeforeEvent(action) {
    console.log(`Event before APP_INIT apply to dispatch`)
}

function appRunAfterEvent(action) {
    console.log(`Event after APP_INIT or APP_RUN applied to dispatch`)
}

redLiveSubBefore('APP_INIT', appInitBeforeEvent)
redLiveSubAfter(['APP_INIT', 'APP_RUN'], appRunAfterEvent)
```