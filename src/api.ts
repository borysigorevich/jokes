import axios from 'axios';

const randomJokesURL = 'http://api.icndb.com/jokes/random/';
const categoriesURL = 'http://api.icndb.com/categories';

const allCategories = '?limitTo=[nerdy,explicit]';

export const API = {
	getJokes: async (numOfJokes: string, category: string) => (await axios.get(randomJokesURL + numOfJokes +
        (category === 'all' ? `${allCategories}` : `?limitTo=[${category}]`))).data.value,
	getCategories: async () => (await axios.get(categoriesURL)).data.value,
	getMoreJokes: async (numOfJokes: string, category: string) => (await axios.get(randomJokesURL +
        (numOfJokes ? numOfJokes : '3') +
        ((category === 'all' ? `${allCategories}` : `?limitTo=[${category}]`)))).data.value
};
