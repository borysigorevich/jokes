import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import jokeReducer from "../redux/ducks/jokes";

Enzyme.configure({adapter: new EnzymeAdapter()})

describe('reducer', () => {
    test('SET_JOKES', () => {

        const state = {
            jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            sortedJokes: [],
            categories: [],
            category: 'all',
            initialRender: true,
            joke: '',
            isLoading: true,
            error: {message: ''}
        }

        const action = {
            type: 'axels-test/joke/SET_JOKES',
            payload: {jokes: [{id: 2, joke: 'haha', categories: ['nerdy']}], category: 'explicit'}
        }

        // @ts-ignore
        expect(jokeReducer(state, action)).toEqual({
            ...state,
            jokes: [...state.jokes, ...action.payload.jokes],
            sortedJokes: [],
            initialRender: false,
            isLoading: false
        })
    })

    test('SET_JOKE', () => {
        const state = {
            jokes: [],
            sortedJokes: [],
            categories: [],
            category: 'all',
            initialRender: true,
            joke: '',
            isLoading: true,
            error: {message: ''}
        }

        const action = {
            type: 'axels-test/joke/SET_JOKE',
            payload: 'haha'
        }

        // @ts-ignore
        expect(jokeReducer(state, action)).toEqual({
            ...state,
            joke: action.payload
        })
    })

    test('SET_CATEGORIES', () => {
        const state = {
            jokes: [],
            sortedJokes: [],
            categories: [],
            category: 'all',
            initialRender: true,
            joke: '',
            isLoading: false,
            error: {message: ''}
        }

        const action = {
            type: 'axels-test/joke/SET_CATEGORIES',
            payload: ['nerdy', 'explicit']
        }

        // @ts-ignore
        expect(jokeReducer(state, action)).toEqual({
            ...state,
            categories: action.payload
        })
    })

    test('SET_MORE_JOKES', () => {
        const state = {
            jokes: [{id: 1, joke: 'first', categories: ['nerdy']}, {id: 2, joke: 'second', categories: ['explicit']}],
            sortedJokes: [],
            categories: [],
            category: 'nerdy',
            initialRender: true,
            joke: '',
            isLoading: true,
            error: {message: ''}
        }

        const action = {
            type: 'axels-test/joke/SET_MORE_JOKES',
            payload: [{id: 3, joke: 'third', categories: ['nerdy']}]
        }

        // @ts-ignore
        expect(jokeReducer(state, action)).toEqual({
            ...state,
            jokes: [...state.jokes, ...action.payload],
            sortedJokes: [{id: 1, joke: 'first', categories: ['nerdy']}, {id: 3, joke: 'third', categories: ['nerdy']}],
            isLoading: false,
            error: {message: ''}
        })
    })

    test('SET_SORTED_JOKES', () => {
        const state = {
            jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            sortedJokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            categories: [],
            category: 'all',
            initialRender: true,
            joke: '',
            isLoading: false,
            error: {message: ''}
        }

        const action = {
            type: 'axels-test/joke/SET_SORTED_JOKES',
            payload: 'e'
        }

        // @ts-ignore
        expect(jokeReducer(state, action)).toEqual({
            jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
            sortedJokes: [],
            categories: [],
            category: 'e',
            initialRender: true,
            joke: ''
        })
    })
})