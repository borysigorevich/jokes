import {runSaga} from "redux-saga";

import jokeReducer, {
    getCategoriesWorker,
    getJokesWorker,
    getMoreJokesWorker,
    REQUEST_FAILURE, requestFailure, requestFailureType, SENT_REQUEST, sentRequestType,
    SET_CATEGORIES,
    SET_JOKES,
    SET_MORE_JOKES,
    SET_SORTED_JOKES,
    setCategories,
    setCategoriesType,
    setJokes,
    setJokesType,
    setMoreJokes, setMoreJokesType, setSortedJokesType
} from "../redux/ducks/jokes";
import {API} from "../api";
import {mockState} from "./utils";

describe('reducer', () => {

    test('SET_JOKES', () => {

        const state = mockState({jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}]})

        const action = {
            type: SET_JOKES,
            payload: {jokes: [{id: 2, joke: 'haha', categories: ['nerdy']}], category: 'explicit'}
        } as setJokesType

        expect(jokeReducer(state, action)).toEqual({
            ...state,
            jokes: [...state.jokes, ...action.payload.jokes],
            sortedJokes: [],
            initialRender: false,
            isLoading: false
        })
    })

    test('SET_CATEGORIES', () => {
        const state = mockState({})

        const action = {
            type: SET_CATEGORIES,
            payload: ['nerdy', 'explicit']
        } as setCategoriesType

        expect(jokeReducer(state, action)).toEqual({
            ...state,
            categories: action.payload,
            initialRender: false
        })
    })

    test('SET_MORE_JOKES', () => {
        const state = mockState({
            jokes: [{id: 1, joke: 'first', categories: ['nerdy']}, {
                id: 2,
                joke: 'second',
                categories: ['explicit']
            }]
        })

        const action = {
            type: SET_MORE_JOKES,
            payload: [{id: 3, joke: 'third', categories: ['nerdy']}]
        } as setMoreJokesType

        expect(jokeReducer(state, action)).toEqual({
            ...state,
            jokes: [...state.jokes, ...action.payload],
            sortedJokes: [
                {id: 1, joke: 'first', categories: ['nerdy']},
                {id: 2, joke: 'second', categories: ['explicit']},
                {id: 3, joke: 'third', categories: ['nerdy']}],
            isLoading: false,
            error: {message: ''}
        })

    })

    test('SET_SORTED_JOKES', () => {
        const state = mockState({
            jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            sortedJokes: [{id: 1, joke: 'haha', categories: ['nerdy']}]
        })

        const action = {
            type: SET_SORTED_JOKES,
            payload: 'explicit'
        } as setSortedJokesType

        expect(jokeReducer(state, action)).toEqual({
            jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            sortedJokes: [],
            categories: [],
            category: 'explicit',
            initialRender: true,
            joke: '',
            isLoading: true,
            error: {message: ''}
        })
    })

    test('SENT_REQUEST', () => {
        const state = mockState({})

        const action = {
            type: SENT_REQUEST
        } as sentRequestType

        expect(jokeReducer(state, action)).toEqual({
            ...state,
            isLoading: true
        })
    })

    test('REQUEST_FAILURE', () => {
        const state = mockState({})


        const action = {
            type: REQUEST_FAILURE,
            payload: 'error'
        } as requestFailureType

        expect(jokeReducer(state, action)).toEqual({
            ...state,
            isLoading: false,
            error: {message: action.payload}
        })
    })

    test('getJokesWorker', async () => {
        const dummyJokes = [{id: 1, joke: 'Ha-ha', categories: ['nerdy']}]

        const getJokes = jest.spyOn(API, 'getJokes').mockImplementation(() => {
            return Promise.resolve(dummyJokes)
        })

        const dispatched: Array<setJokesType> = []

        await runSaga({
            dispatch: (action: setJokesType) => dispatched.push(action)
        }, getJokesWorker, {type: 'axels-test/joke/GET_JOKES', payload: {category: 'nerdy', numOfJokes: '1'}})
        expect(getJokes).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([setJokes([{id: 1, joke: 'Ha-ha', categories: ['nerdy']}], 'nerdy')])
        getJokes.mockClear()
    })

    test('getCategoriesWorker', async () => {
        const dummyCategories = ['nerdy', 'explicit']

        const getCategories = jest.spyOn(API, 'getCategories').mockImplementation(() => Promise.resolve(dummyCategories))

        const dispatched: Array<setCategoriesType> = []
        await runSaga({
            dispatch: (action: setCategoriesType) => dispatched.push(action)
        }, getCategoriesWorker)
        expect(getCategories).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([setCategories(dummyCategories)])
        getCategories.mockClear()
    })

    test('getMoreJokesWorker', async () => {
        const dummyJokes = [{id: 1, joke: 'ha-ha', categories: ['nerdy']}]
        const getJokes = jest.spyOn(API, 'getMoreJokes').mockImplementation(() => Promise.resolve(dummyJokes))

        const dispatched: Array<setJokesType> = []
        await runSaga({
            dispatch: (action: setJokesType) => dispatched.push(action)
        }, getMoreJokesWorker, {type: 'axels-test/joke/GET_MORE_JOKES', payload: '2'})
        expect(getJokes).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([setMoreJokes(dummyJokes)])
        getJokes.mockClear()
    })

    test('getMoreJokesWorkerError', async () => {
        const dummyError = {name: 'error', message: 'error'}
        const getJokes = jest.spyOn(API, 'getMoreJokes').mockImplementation(() => Promise.reject(dummyError))

        const dispatched: Array<setJokesType> = []
        await runSaga({
            dispatch: (action: setJokesType) => dispatched.push(action)
        }, getMoreJokesWorker, {type: 'axels-test/joke/GET_MORE_JOKES', payload: '2'})

        expect(getJokes).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([requestFailure(dummyError.message)])
        getJokes.mockClear()
    })
})