import axios from "axios";

const randomJokesURL = 'http://api.icndb.com/jokes/random/'
const categoriesURL = 'http://api.icndb.com/categories'

export const API = {
    getJokes: async (numOfJokes: string) => (await axios.get(randomJokesURL + numOfJokes)).data.value,
    getCategories: async () => (await axios.get(categoriesURL)).data.value,
    getMoreJokes: async (numOfJokes: string) => (await axios.get(randomJokesURL + (numOfJokes ? numOfJokes : '3'))).data.value
}