import React, {useEffect, useRef, useState} from 'react'
// import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, Container, Input, List, Select} from "./jokesStyles";


const Jokes = () => {
    const [jokes, setJokes] = useState([])
    const [sortedJokes, setSortedJokes] = useState([])

    const [numOfJokes, setNumOfJokes] = useState('')

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('all')

    const initialRender = useRef(false)

    useEffect(() => {
        const getJokes = async () => {
            if (!initialRender.current) {
                try {
                    const res = await axios.get('http://api.icndb.com/jokes/random/3')
                    initialRender.current = true
                    setJokes(res.data.value)
                    setSortedJokes(res.data.value)
                } catch (err) {
                    console.log(err)
                }
            } else {
                // console.log('else')
            }
        }
        getJokes()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('http://api.icndb.com/categories')
            setCategories(res.data.value)
        }
        getCategories()
    }, [])

    const handleClick = async () => {
        const res = await axios.get(`http://api.icndb.com/jokes/random/${numOfJokes ? numOfJokes : 3}`)
        const receivedJokes = res.data.value

        setJokes([...jokes, ...receivedJokes])
        setSortedJokes([...jokes, ...receivedJokes].filter(joke => {
            if (category === 'all') {
                return joke
            } else {
                return joke.categories.includes(category)
            }
        }))
    }

    const handleChange = (e) => {
        setNumOfJokes(e.target.value)
    }

    const onHandleCategoriesChange = e => {
        const category = e.target.value
        setCategory(category)
        if (category === 'all') {
            setSortedJokes(jokes)
        } else {
            setSortedJokes(jokes.filter(joke => {
                return joke.categories.includes(category)
            }))
        }
    }

    return (
        <Container>
            <Select onChange={onHandleCategoriesChange}>
                <option value="all">All</option>
                {categories.map(category => {
                    return <option key={category}
                                   value={category}>{category[0].toUpperCase() + category.substring(1)}</option>
                })}
            </Select>
            <List>
                {sortedJokes.map(joke => (
                    <li key={joke.id}>
                        <Link className={'link'} to={`/joke/${joke.id}`}>
                            {joke.joke.length > 100 ? joke.joke.substring(0, 100) + '...' : joke.joke}
                        </Link>
                    </li>))
                }
            </List>
            <Input onChange={handleChange}
                   value={numOfJokes}
                   type="number"
                   placeholder={'How many jokes do you want to get?'}/>
            <Button onClick={handleClick}>Get more jokes!</Button>
        </Container>
    );
};

export default Jokes