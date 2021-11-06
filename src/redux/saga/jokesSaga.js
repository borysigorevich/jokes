import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects'

import {
    GET_CATEGORIES,
    GET_JOKES,
    GET_MORE_JOKES,
    setCategories,
    setJokes,
    setMoreJokes
} from "../store/joke-reducer";

const getJokes = async () => {
    return await axios.get('http://api.icndb.com/jokes/random/3')
}

const getCategories = async () => {
    return await axios.get('http://api.icndb.com/categories')
}

const getMoreJokes = async (numOfJokes) => {
    return await axios.get('http://api.icndb.com/jokes/random/' + (numOfJokes ? numOfJokes : '3'))
}


function* getJokesWorker() {
    const res = yield getJokes()
    yield put(setJokes(res.data.value))
}

function* getCategoriesWorker() {
    const res = yield getCategories()
    yield put(setCategories(res.data.value))
}

function* getMoreJokesWorker(action) {
    const res = yield getMoreJokes(action.payload)
    yield put(setMoreJokes(res.data.value))
}

export function* jokesWatcher() {
    yield takeEvery(GET_JOKES, getJokesWorker)
    yield takeEvery(GET_CATEGORIES, getCategoriesWorker)
    yield takeEvery(GET_MORE_JOKES, getMoreJokesWorker)
}