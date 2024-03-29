import {runSaga} from 'redux-saga';

import jokeReducer, {
	getCategoriesWorker,
	getJokesWorker,
	getMoreJokesWorker, JokeType,
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
} from '../redux/ducks/jokes';
import {API} from '../api';
import {mockState} from './utils';

describe('reducer', () => {
	let dummyJokes: Array<JokeType>;

	beforeEach(() => {
		dummyJokes = [{id: 1, joke: 'ha-ha', categories: ['nerdy']}];
	});

	it('should jokes value', () => {

		const state = mockState({jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}]});

		const action = {
			type: SET_JOKES,
			payload: {jokes: [{id: 2, joke: 'haha', categories: ['nerdy']}], category: 'explicit'}
		} as setJokesType;

		expect(jokeReducer(state, action)).toEqual({
			...state,
			jokes: [...state.jokes, ...action.payload.jokes],
			sortedJokes: [],
			initialRender: false,
			isLoading: false
		});
	});

	it('should update categories value', () => {
		const state = mockState({});

		const action = {
			type: SET_CATEGORIES,
			payload: ['nerdy', 'explicit']
		} as setCategoriesType;

		expect(jokeReducer(state, action)).toEqual({
			...state,
			categories: action.payload,
			initialRender: false
		});
	});

	it('should update jokes and sortedJokes value', () => {
		const state = mockState({
			jokes: [{id: 1, joke: 'first', categories: ['nerdy']}, {
				id: 2,
				joke: 'second',
				categories: ['explicit']
			}]
		});

		const action = {
			type: SET_MORE_JOKES,
			payload: [{id: 3, joke: 'third', categories: ['nerdy']}]
		} as setMoreJokesType;

		expect(jokeReducer(state, action)).toEqual({
			...state,
			jokes: [...state.jokes, ...action.payload],
			sortedJokes: [
				{id: 1, joke: 'first', categories: ['nerdy']},
				{id: 2, joke: 'second', categories: ['explicit']},
				{id: 3, joke: 'third', categories: ['nerdy']}],
			isLoading: false,
			error: {message: ''}
		});

	});

	it('should not update categories', () => {
		const state = mockState({
			jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
			sortedJokes: [{id: 1, joke: 'haha', categories: ['nerdy']}]
		});

		const action = {
			type: SET_SORTED_JOKES,
			payload: 'explicit'
		} as setSortedJokesType;

		expect(jokeReducer(state, action)).toEqual({
			jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
			sortedJokes: [],
			categories: [],
			category: 'explicit',
			initialRender: true,
			joke: '',
			isLoading: true,
			error: {message: ''}
		});
	});

	it('should update isLoading value', () => {
		const state = mockState({});

		const action = {
			type: SENT_REQUEST
		} as sentRequestType;

		expect(jokeReducer(state, action)).toEqual({
			...state,
			isLoading: true
		});
	});

	it('should update error value', () => {
		const state = mockState({});
		const action = {
			type: REQUEST_FAILURE,
			payload: 'error'
		} as requestFailureType;

		expect(jokeReducer(state, action)).toEqual({
			...state,
			isLoading: false,
			error: {message: action.payload}
		});
	});

	it('should call setJokes action creater', async () => {

		const getJokes = jest.spyOn(API, 'getJokes').mockImplementation(() => {
			return Promise.resolve(dummyJokes);
		});

		const dispatched: Array<setJokesType> = [];

		await runSaga({
			dispatch: (action: setJokesType) => dispatched.push(action)
		}, getJokesWorker, {type: 'axels-test/joke/GET_JOKES', payload: {category: 'nerdy', numOfJokes: '1'}});
		expect(getJokes).toHaveBeenCalledTimes(1);
		expect(dispatched).toEqual([setJokes([{id: 1, joke: 'ha-ha', categories: ['nerdy']}], 'nerdy')]);
		getJokes.mockClear();
	});

	it('should call setCategories action creator', async () => {
		const dummyCategories = ['nerdy', 'explicit'];
		const getCategories = jest.spyOn(API, 'getCategories').mockImplementation(() => Promise.resolve(dummyCategories));

		const dispatched: Array<setCategoriesType> = [];
		await runSaga({
			dispatch: (action: setCategoriesType) => dispatched.push(action)
		}, getCategoriesWorker);
		expect(getCategories).toHaveBeenCalledTimes(1);
		expect(dispatched).toEqual([setCategories(dummyCategories)]);
		getCategories.mockClear();
	});

	it('should call setMoreJokes action creator', async () => {
		const getJokes = jest.spyOn(API, 'getMoreJokes').mockImplementation(() => Promise.resolve(dummyJokes));

		const dispatched: Array<setJokesType> = [];
		await runSaga({
			dispatch: (action: setJokesType) => dispatched.push(action)
		}, getMoreJokesWorker, {type: 'axels-test/joke/GET_MORE_JOKES', payload: {numOfJokes: '2', category: 'all'}});
		expect(getJokes).toHaveBeenCalledTimes(1);
		expect(dispatched).toEqual([setMoreJokes(dummyJokes)]);
		getJokes.mockClear();
	});

	it('should call requestFailure action creator', async () => {
		const dummyError = {name: 'error', message: 'error'};
		const getJokes = jest.spyOn(API, 'getMoreJokes').mockImplementation(() => Promise.reject(dummyError));

		const dispatched: Array<setJokesType> = [];
		await runSaga({
			dispatch: (action: setJokesType) => dispatched.push(action)
		}, getMoreJokesWorker, {type: 'axels-test/joke/GET_MORE_JOKES', payload: {numOfJokes: '2', category: 'all'}});

		expect(getJokes).toHaveBeenCalledTimes(1);
		expect(dispatched).toEqual([requestFailure(dummyError.message)]);
		getJokes.mockClear();
	});
});
