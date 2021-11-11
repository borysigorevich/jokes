import axios from "axios";

const randomJokesURL = 'http://api.icndb.com/jokes/random/'
const specificJokeURL = 'http://api.icndb.com/jokes/'
const categoriesURL = 'http://api.icndb.com/categories'

export const getJokesAPI = async (numOfJokes: string) => await axios.get(randomJokesURL + numOfJokes)

export const getJokeAPI = async (id: undefined | string) => await axios.get(specificJokeURL + id)

export const getCategoriesAPI = async () => await axios.get(categoriesURL)

export const getMoreJokesAPI = async (numOfJokes: string) => await axios.get(randomJokesURL + (numOfJokes ? numOfJokes : '3'))