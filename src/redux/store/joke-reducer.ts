const SET_JOKES = 'axels-test/joke/SET_JOKES'
export const GET_JOKES = 'axels-test/joke/GET_JOKES'

const SET_JOKE = 'axels-test/joke/SET_JOKE'
export const GET_JOKE = 'axels-test/joke/GET_JOKE'

const SET_MORE_JOKES = 'axels-test/joke/SET_MORE_JOKES'
export const GET_MORE_JOKES = 'axels-test/joke/GET_MORE_JOKES'

const SET_SORTED_JOKES = 'axels-test/joke/SET_SORTED_JOKES'

const SET_CATEGORIES = 'axels-test/joke/SET_CATEGORIES'
export const GET_CATEGORIES = 'axels-test/joke/GET_CATEGORIES'

const SET_INITIAL_RENDER = 'axels-test/joke/SET_INITIAL_RENDER'

export type JokeType = {
    id: number,
    joke: string,
    categories: Array<string>
}

export type StateType = {
    jokes: Array<JokeType>
    sortedJokes: Array<JokeType>
    categories: Array<string>
    category: string
    initialRender: boolean
    joke: string
}

export const initialState: StateType = {
    jokes: [],
    sortedJokes: [],
    categories: [],
    category: 'all',
    initialRender: true,
    joke: ''
}

const jokeReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
        case SET_JOKES:
            return {
                ...state,
                jokes: [...state.jokes, ...action.payload],
                sortedJokes: [...state.jokes, ...action.payload]
            }
        case SET_JOKE:
            return {
                ...state,
                joke: action.payload
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...action.payload]
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
                })
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
        case SET_INITIAL_RENDER:
            return {
                ...state,
                initialRender: false
            }
        default:
            return state
    }
}
//GET JOKES
type setJokesType = {
    type: typeof SET_JOKES
    payload: Array<JokeType>
}

export const setJokes = (jokes: Array<JokeType>): setJokesType => {
    return {
        type: SET_JOKES,
        payload: jokes
    }
}

type getJokesType = {
    type: typeof GET_JOKES
}

export const getJokes = (): getJokesType => {
    return {
        type: GET_JOKES
    }
}

//GET JOKE
type setJokeType = {
    type: typeof SET_JOKE
    payload: string
}

export const setJoke = (joke: string): setJokeType => {
    return {
        type: SET_JOKE,
        payload: joke
    }
}

export type getJokeType = {
    type: typeof GET_JOKE
    payload: undefined | string
}

export const getJoke = (id: undefined | string): getJokeType => {
    return {
        type: GET_JOKE,
        payload: id
    }
}

//GET MORE JOKES
type setMoreJokesType = {
    type: typeof SET_MORE_JOKES
    payload: Array<JokeType>
}

export const setMoreJokes = (newJokes: Array<JokeType>): setMoreJokesType => {
    return {
        type: SET_MORE_JOKES,
        payload: newJokes
    }
}

export type getMoreJokesType = {
    type: typeof GET_MORE_JOKES
    payload: string
}

export const getMoreJokes = (numOfJokes: string): getMoreJokesType => {
    return {
        type: GET_MORE_JOKES,
        payload: numOfJokes
    }
}

//SORT JOKES
type setSortedJokesType = {
    type: typeof SET_SORTED_JOKES
    payload: string
}

export const setSortedJokes = (category: string): setSortedJokesType => {
    return {
        type: SET_SORTED_JOKES,
        payload: category
    }
}

//GET CATEGORIES
type setCategoriesType = {
    type: typeof SET_CATEGORIES
    payload: Array<string>
}

export const setCategories = (categories: Array<string>): setCategoriesType => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}

type getCategoriesType = {
    type: typeof GET_CATEGORIES
}

export const getCategories = (): getCategoriesType => {
    return {
        type: GET_CATEGORIES
    }
}

//INITIAL RENDER
type setInitialRenderType = {
    type: typeof SET_INITIAL_RENDER
}

export const setInitialRender = (): setInitialRenderType => {
    return {
        type: SET_INITIAL_RENDER
    }
}


export default jokeReducer

