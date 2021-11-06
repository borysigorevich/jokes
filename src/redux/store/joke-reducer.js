const SET_JOKES = 'SET_JOKES'
export const GET_JOKES = 'GET_JOKES'

const SET_MORE_JOKES = 'SET_MORE_JOKES'
export const GET_MORE_JOKES = 'GET_MORE_JOKES'

const SET_SORTED_JOKES = 'SET_SORTED_JOKES'

const SET_CATEGORIES = 'SET_CATEGORIES'
export const GET_CATEGORIES = 'GET_CATEGORIES'

const SET_INITIAL_RENDER = 'SET_INITIAL_RENDER'

const initialState = {
    jokes: [],
    sortedJokes: [],
    numOfJokes: 3,
    categories: [],
    category: 'all',
    initialRender: true
}

const jokeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOKES:
            return {
                ...state,
                jokes: [...state.jokes, ...action.payload],
                sortedJokes: [...state.jokes, ...action.payload]
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...action.payload]
            }
        case SET_MORE_JOKES:
            return {
                ...state,
                jokes: [...state.jokes, ...action.payload],
                sortedJokes: [...state.jokes, ...action.payload].filter(joke => {
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
export const setJokes = jokes => {
    return {
        type: SET_JOKES,
        payload: jokes
    }
}

export const getJokes = () => {
    return {
        type: GET_JOKES
    }
}

//GET MORE JOKES
export const setMoreJokes = newJokes => {
    return {
        type: SET_MORE_JOKES,
        payload: newJokes
    }
}

export const getMoreJokes = numOfJokes => {
    return {
        type: GET_MORE_JOKES,
        payload: numOfJokes
    }
}

//SORT JOKES

export const setSortedJokes = category => {
    return {
        type: SET_SORTED_JOKES,
        payload: category
    }
}

//GET CATEGORIES
export const setCategories = categories => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}

export const getCategories = () => {
    return {
        type: GET_CATEGORIES
    }
}

//INITIAL RENDER
export const setInitialRender = () => {
    return {
        type: SET_INITIAL_RENDER
    }
}

export default jokeReducer

