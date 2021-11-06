import {applyMiddleware, combineReducers, createStore} from "redux";
import jokeReducer from "./joke-reducer";
import createSagaMiddleware from 'redux-saga'
import {jokesWatcher} from "../saga/jokesSaga";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    jokes: jokeReducer
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(jokesWatcher)
