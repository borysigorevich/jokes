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

const initialState = {
    jokes: [],
    sortedJokes: [],
    numOfJokes: 3,
    categories: [],
    category: 'all',
    initialRender: true,
    joke: ''
}

const jokeReducer = (state = initialState, action) => {
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
                jokes: [...state.jokes, ...action.payload.filter(joke => {
                    return !state.jokes.some(stateJoke => {
                        return stateJoke.id === joke.id
                    })
                })],
                sortedJokes: [...state.jokes, ...action.payload.filter(joke => {
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

//GET JOKE
export const setJoke = joke => {
    return {
        type: SET_JOKE,
        payload: joke
    }
}

export const getJoke = id => {
    return {
        type: GET_JOKE,
        payload: id
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

