import axios, {AxiosResponse} from 'axios';

import {put, takeEvery} from 'redux-saga/effects'

import {
    GET_CATEGORIES, GET_JOKE,
    GET_JOKES,
    GET_MORE_JOKES, getJokesType, getJokeType, getMoreJokesType,
    setCategories, setJoke,
    setJokes,
    setMoreJokes
} from '../store/joke-reducer';

const getJokes = async () => await axios.get('http://api.icndb.com/jokes/random/3')

const getJoke = async (id: undefined | string) => await axios.get('http://api.icndb.com/jokes/' + id)

const getCategories = async () => await axios.get('http://api.icndb.com/categories')

const getMoreJokes = async (numOfJokes: string) => await axios.get('http://api.icndb.com/jokes/random/' + (numOfJokes ? numOfJokes : '3'))

function* getJokesWorker(action: getJokesType) {
    const res: AxiosResponse = yield getJokes()
    yield put(setJokes(res.data.value, action.payload))
}

function* getJokeWorker(action: getJokeType) {
    const res: AxiosResponse = yield getJoke(action.payload)
    yield put(setJoke(res.data.value.joke))
}

function* getCategoriesWorker() {
    const res: AxiosResponse = yield getCategories()
    yield put(setCategories(res.data.value))
}

function* getMoreJokesWorker(action: getMoreJokesType) {
    const res: AxiosResponse = yield getMoreJokes(action.payload)
    yield put(setMoreJokes(res.data.value))
}

export function* jokesWatcher() {
    yield takeEvery(GET_JOKES, getJokesWorker)
    yield takeEvery(GET_CATEGORIES, getCategoriesWorker)
    yield takeEvery(GET_MORE_JOKES, getMoreJokesWorker)
    yield takeEvery(GET_JOKE, getJokeWorker)
}