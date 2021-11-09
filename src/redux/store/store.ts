import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'

import {jokesWatcher} from '../saga/jokesSaga';
import jokeReducer, {StateType} from './joke-reducer';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    jokes: jokeReducer
})

export type RootState = {
    jokes: StateType
}

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(jokesWatcher)
