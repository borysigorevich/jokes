import {AxiosResponse} from 'axios';

import {put, takeEvery} from 'redux-saga/effects';
import {getCategoriesAPI, getJokeAPI, getJokesAPI, getMoreJokesAPI} from "../../api";

const SENT_REQUEST = 'SENT_REQUEST';

const REQUEST_FAILURE = 'REQUEST_FAILURE';

const SET_JOKES = 'axels-test/joke/SET_JOKES';
export const GET_JOKES = 'axels-test/joke/GET_JOKES';

const SET_JOKE = 'axels-test/joke/SET_JOKE';
export const GET_JOKE = 'axels-test/joke/GET_JOKE';

const SET_MORE_JOKES = 'axels-test/joke/SET_MORE_JOKES';
export const GET_MORE_JOKES = 'axels-test/joke/GET_MORE_JOKES';

const SET_SORTED_JOKES = 'axels-test/joke/SET_SORTED_JOKES';

const SET_CATEGORIES = 'axels-test/joke/SET_CATEGORIES';
export const GET_CATEGORIES = 'axels-test/joke/GET_CATEGORIES';

export type JokeType = {
    id: number
    joke: string
    categories: Array<string>
}

type errorType = {
    message: string
}

export type StateType = {
    jokes: Array<JokeType>
    sortedJokes: Array<JokeType>
    categories: Array<string>
    category: string
    initialRender: boolean
    joke: string
    isLoading: boolean
    error: errorType
}

const joke = JSON.parse(localStorage.getItem('joke')!);

export const initialState: StateType = {
    jokes: joke ? [joke] : [],
    sortedJokes: [],
    categories: [],
    category: 'all',
    initialRender: true,
    joke: '',
    isLoading: true,
    error: {message: ''}
};

//ACTIONS TYPES
type requestFailureType = {
    type: typeof REQUEST_FAILURE,
    payload: string
}

type sentRequest = {
    type: typeof SENT_REQUEST
}

export type setJokesType = {
    type: typeof SET_JOKES
    payload: { jokes: Array<JokeType>, category: string }
}

type setJokeType = {
    type: typeof SET_JOKE
    payload: string
}

type setMoreJokesType = {
    type: typeof SET_MORE_JOKES
    payload: Array<JokeType>
}

type setSortedJokesType = {
    type: typeof SET_SORTED_JOKES
    payload: string
}

type setCategoriesType = {
    type: typeof SET_CATEGORIES
    payload: Array<string>
}

type ActionsType =
    setJokesType |
    setJokeType |
    setMoreJokesType |
    setSortedJokesType |
    setCategoriesType |
    requestFailureType |
    sentRequest

//REDUCER
const jokeReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_JOKES:
            return {
                ...state,
                jokes: [...state.jokes, ...action.payload.jokes],
                sortedJokes: [...state.jokes, ...action.payload.jokes].filter(joke => {
                    if (action.payload.category === 'all') {
                        return joke
                    } else {
                        return joke.categories.includes(action.payload.category)
                    }
                }),
                initialRender: false,
                isLoading: false
            }
        case SET_JOKE:
            return {
                ...state,
                joke: action.payload
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...action.payload],
                initialRender: false
            }
        case SET_MORE_JOKES:
            return {
                ...state,
                jokes: [...state.jokes, ...action.payload.filter((joke: JokeType) => {
                    return !state.jokes.some(stateJoke => {
                        return stateJoke.id === joke.id
                    })
                })],
                sortedJokes: [...state.jokes, ...action.payload.filter((joke: JokeType) => {
                    return !state.jokes.some(stateJoke => {
                        return stateJoke.id === joke.id
                    })
                })].filter(joke => {
                    if (state.category === 'all') {
                        return joke
                    } else {
                        return joke.categories.includes(state.category)
                    }
                }),
                isLoading: false,
                error: {message: ''}
            }
        case SET_SORTED_JOKES:
            return {
                ...state,
                sortedJokes: state.jokes.filter(joke => {
                    if (action.payload === 'all') {
                        return joke
                    } else {
                        return joke.categories.includes(action.payload)
                    }
                }),
                category: action.payload
            }
        case SENT_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case REQUEST_FAILURE: {

            return {
                ...state,
                isLoading: false,
                error: {message: action.payload}
            }
        }
        default:
            return state
    }
}

//*******ACTIONS CREATORS********

//SENT REQUEST
export const setIsLoading = () => ({
    type: SENT_REQUEST
})

//REQUEST FAILURE
export const requestFailure = (error: string) => ({
    type: REQUEST_FAILURE,
    payload: error
})

//GET JOKES
export const setJokes = (jokes: Array<JokeType>, category: string): setJokesType => ({
    type: SET_JOKES,
    payload: {jokes, category}
})

export type getJokesType = {
    type: typeof GET_JOKES,
    payload: { category: string, numOfJokes: string }
}

export const getJokes = (category: string, numOfJokes: string): getJokesType => ({
    type: GET_JOKES,
    payload: {category, numOfJokes}
})

//GET JOKE
export const setJoke = (joke: string): setJokeType => ({
    type: SET_JOKE,
    payload: joke
})

export type getJokeType = {
    type: typeof GET_JOKE
    payload: undefined | string
}

export const getJoke = (id: undefined | string): getJokeType => ({
    type: GET_JOKE,
    payload: id
})

//GET MORE JOKES
export const setMoreJokes = (newJokes: Array<JokeType>): setMoreJokesType => ({
    type: SET_MORE_JOKES,
    payload: newJokes
})

export type getMoreJokesType = {
    type: typeof GET_MORE_JOKES
    payload: string
}

export const getMoreJokes = (numOfJokes: string): getMoreJokesType => ({
    type: GET_MORE_JOKES,
    payload: numOfJokes
})

//SORT JOKES
export const setSortedJokes = (category: string): setSortedJokesType => ({
    type: SET_SORTED_JOKES,
    payload: category
})

//GET CATEGORIES
export const setCategories = (categories: Array<string>): setCategoriesType => ({
    type: SET_CATEGORIES,
    payload: categories
})

type getCategoriesType = {
    type: typeof GET_CATEGORIES
}

export const getCategories = (): getCategoriesType => ({
    type: GET_CATEGORIES
})
//*********************


//SAGA WORKERS
function* getJokesWorker(action: getJokesType) {
    try {
        const res: AxiosResponse = yield getJokesAPI(action.payload.numOfJokes)
        yield put(setJokes(res.data.value, action.payload.category))
    } catch (e: any) {
        yield put(requestFailure((e as Error).message))
    }
}

function* getJokeWorker(action: getJokeType) {
    try {
        const res: AxiosResponse = yield getJokeAPI(action.payload)
        yield put(setJoke(res.data.value.joke))
    } catch (e) {
        yield put(requestFailure((e as Error).message))
    }
}

function* getCategoriesWorker() {
    try {
        const res: AxiosResponse = yield getCategoriesAPI()
        yield put(setCategories(res.data.value))
    } catch (e) {
        yield put(requestFailure((e as Error).message))
    }
}

function* getMoreJokesWorker(action: getMoreJokesType) {
    try {
        const res: AxiosResponse = yield getMoreJokesAPI(action.payload)
        yield put(setMoreJokes(res.data.value))
    } catch (e) {
        yield put(requestFailure((e as Error).message))
    }
}

//SAGA WATCHERS
export function* jokesWatcher() {
    yield takeEvery(GET_JOKES, getJokesWorker)
    yield takeEvery(GET_CATEGORIES, getCategoriesWorker)
    yield takeEvery(GET_MORE_JOKES, getMoreJokesWorker)
    yield takeEvery(GET_JOKE, getJokeWorker)
}


export default jokeReducer