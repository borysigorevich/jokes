import {actionsType, PropsType} from './Jokes.test';
import {errorType, JokeType} from '../redux/ducks/jokes';

type mockStateType = {
    jokes?: Array<JokeType>
    sortedJokes?: Array<JokeType>
    categories?: Array<string>
    initialRender?: boolean
    joke?: string
    isLoading?: boolean
    message?: ''
    dispatch?: (action: actionsType) => void
}

type mockStoreType = {
    jokes?: Array<JokeType>
    sortedJokes?: Array<JokeType>
    categories?: Array<string>
    category?: string
    initialRender?: boolean
    joke?: string
    isLoading?: boolean
    error?: errorType
}

export const mockStore = (state: mockStateType): PropsType => ({
    jokesState: {
        jokes: state.jokes || [],
        sortedJokes: state.sortedJokes || [],
        categories: state.categories || [],
        category: 'all',
        initialRender: state.initialRender || true,
        joke: state.joke || '',
        isLoading: state.isLoading || true,
        error: {message: state.message || ''}
    },
    dispatch: state.dispatch || ((action: actionsType) => {
        console.log(action)
    })
})

export const mockState = (state: mockStoreType) => ({
    jokes: state.jokes || [],
    sortedJokes: state.sortedJokes || [],
    categories: state.categories || [],
    category: 'all',
    initialRender: state.initialRender || true,
    joke: state.joke || '',
    isLoading: state.isLoading || true,
    error: state.error || {message: ''}
})