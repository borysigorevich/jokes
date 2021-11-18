import {call, put, takeEvery} from 'redux-saga/effects';
import {API} from '../../api';
import {SagaIterator} from 'redux-saga';

export const SENT_REQUEST = 'axels-test/joke/SENT_REQUEST';

export const REQUEST_FAILURE = 'axels-test/joke/REQUEST_FAILURE';

export const SET_JOKES = 'axels-test/joke/SET_JOKES';
export const GET_JOKES = 'axels-test/joke/GET_JOKES';

export const SET_MORE_JOKES = 'axels-test/joke/SET_MORE_JOKES';
export const GET_MORE_JOKES = 'axels-test/joke/GET_MORE_JOKES';

export const SET_SORTED_JOKES = 'axels-test/joke/SET_SORTED_JOKES';

export const SET_CATEGORIES = 'axels-test/joke/SET_CATEGORIES';
export const GET_CATEGORIES = 'axels-test/joke/GET_CATEGORIES';

export type JokeType = {
	id: number
	joke: string
	categories: Array<string>
}

export type errorType = {
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
export type requestFailureType = {
	type: typeof REQUEST_FAILURE,
	payload: string
}

export type sentRequestType = {
	type: typeof SENT_REQUEST
}

export type setJokesType = {
	type: typeof SET_JOKES
	payload: { jokes: Array<JokeType>, category: string }
}

export type setMoreJokesType = {
	type: typeof SET_MORE_JOKES
	payload: Array<JokeType>
}

export type setSortedJokesType = {
	type: typeof SET_SORTED_JOKES
	payload: string
}

export type setCategoriesType = {
	type: typeof SET_CATEGORIES
	payload: Array<string>
}

export type ActionsType =
	setJokesType |
	setMoreJokesType |
	setSortedJokesType |
	setCategoriesType |
	requestFailureType |
	sentRequestType

export type SagaActionsType =
	getJokesType |
	getMoreJokesType |
	getCategoriesType

//REDUCER
const jokeReducer = (state: StateType = initialState, action: ActionsType): StateType => {
	switch (action.type) {
	case SET_JOKES:
		return {
			...state,
			jokes: [...state.jokes, ...action.payload.jokes],
			sortedJokes: [...state.jokes, ...action.payload.jokes].filter(joke => {
				if (action.payload.category === 'all') {
					return joke;
				} else {
					return joke.categories.includes(action.payload.category);
				}
			}),
			initialRender: false,
			isLoading: false
		};
	case SET_CATEGORIES:
		return {
			...state,
			categories: [...state.categories, ...action.payload],
			initialRender: false
		};
	case SET_MORE_JOKES:
		return {
			...state,
			jokes: [...state.jokes, ...action.payload.filter((joke: JokeType) => {
				return !state.jokes.some(stateJoke => {
					return stateJoke.id === joke.id;
				});
			})],
			sortedJokes: [...state.jokes, ...action.payload.filter((joke: JokeType) => {
				return !state.jokes.some(stateJoke => {
					return stateJoke.id === joke.id;
				});
			})].filter(joke => {
				if (state.category === 'all') {
					return joke;
				} else {
					return joke.categories.includes(state.category);
				}
			}),
			isLoading: false,
			error: {message: ''}
		};
	case SET_SORTED_JOKES:
		return {
			...state,
			sortedJokes: state.jokes.filter(joke => {
				if (action.payload === 'all') {
					return joke;
				} else {
					return joke.categories.includes(action.payload);
				}
			}),
			category: action.payload
		};
	case SENT_REQUEST: {
		return {
			...state,
			isLoading: true
		};
	}
	case REQUEST_FAILURE: {

		return {
			...state,
			isLoading: false,
			error: {message: action.payload}
		};
	}
	default:
		return state;
	}
};

//*******ACTIONS CREATORS********

//SENT REQUEST
export const setIsLoading = (): sentRequestType => ({
	type: SENT_REQUEST
});

//REQUEST FAILURE
export const requestFailure = (error: string): requestFailureType => ({
	type: REQUEST_FAILURE,
	payload: error
});

//GET JOKES
export const setJokes = (jokes: Array<JokeType>, category: string): setJokesType => ({
	type: SET_JOKES,
	payload: {jokes, category}
});

export type getJokesType = {
	type: typeof GET_JOKES,
	payload: { category: string, numOfJokes: string }
}

export const getJokes = (category: string, numOfJokes: string): getJokesType => {
	return {
		type: GET_JOKES,
		payload: {category, numOfJokes}
	};
};

//GET MORE JOKES
export const setMoreJokes = (newJokes: Array<JokeType>): setMoreJokesType => ({
	type: SET_MORE_JOKES,
	payload: newJokes
});

export type getMoreJokesType = {
	type: typeof GET_MORE_JOKES
	payload: {
		numOfJokes: string
		category: string
	}
}

export const getMoreJokes = (numOfJokes: string, category: string): getMoreJokesType => ({
	type: GET_MORE_JOKES,
	payload: {numOfJokes, category}
});

//SORT JOKES
export const setSortedJokes = (category: string): setSortedJokesType => ({
	type: SET_SORTED_JOKES,
	payload: category
});

//GET CATEGORIES
export const setCategories = (categories: Array<string>): setCategoriesType => ({
	type: SET_CATEGORIES,
	payload: categories
});

type getCategoriesType = {
	type: typeof GET_CATEGORIES
}

export const getCategories = (): getCategoriesType => {
	return {
		type: GET_CATEGORIES
	};
};
//*********************

//SAGA WORKERS
export function* getJokesWorker(action: getJokesType): SagaIterator {
	try {
		const res: Array<JokeType> = yield call(API.getJokes, action.payload.numOfJokes, action.payload.category);
		yield put(setJokes(res, action.payload.category));
	} catch (e) {
		yield put(requestFailure((e as Error).message));
	}
}

export function* getCategoriesWorker(): SagaIterator {
	try {
		const res: Array<string> = yield call(API.getCategories);
		yield put(setCategories(res));
	} catch (e) {
		yield put(requestFailure((e as Error).message));
	}
}

export function* getMoreJokesWorker(action: getMoreJokesType): SagaIterator {
	try {
		const res: Array<JokeType> = yield call(API.getMoreJokes, action.payload.numOfJokes, action.payload.category);
		yield put(setMoreJokes(res));
	} catch (e) {
		yield put(requestFailure((e as Error).message));
	}
}

//SAGA WATCHERS
export function* jokesWatcher() {
	yield takeEvery(GET_JOKES, getJokesWorker);
	yield takeEvery(GET_CATEGORIES, getCategoriesWorker);
	yield takeEvery(GET_MORE_JOKES, getMoreJokesWorker);
}

export default jokeReducer;
