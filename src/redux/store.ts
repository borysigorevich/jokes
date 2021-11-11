import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import jokeReducer, {jokesWatcher, StateType} from './ducks/jokes';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    jokes: jokeReducer
})

export type RootState = {
    jokes: StateType
}

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(jokesWatcher)
