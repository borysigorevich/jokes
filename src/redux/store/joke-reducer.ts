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
    id: number
    joke: string
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

//ACTIONS TYPES
type setJokesType = {
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

type setInitialRenderType = {
    type: typeof SET_INITIAL_RENDER
}

type ActionsType =
    setJokesType
    | setJokeType
    | setMoreJokesType
    | setSortedJokesType
    | setCategoriesType
    | setInitialRenderType

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
        })
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
export const setJokes = (jokes: Array<JokeType>, category: string): setJokesType => ({
        type: SET_JOKES,
        payload: {jokes, category}
    })

export type getJokesType = {
    type: typeof GET_JOKES,
    payload: string
}

export const getJokes = (category: string): getJokesType => ({
        type: GET_JOKES,
        payload: category
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

//INITIAL RENDER
export const setInitialRender = (): setInitialRenderType => ({
        type: SET_INITIAL_RENDER
    })

export default jokeReducer

