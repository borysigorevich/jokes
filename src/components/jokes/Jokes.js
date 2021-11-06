import React, {useEffect, useRef, useState} from 'react'
// import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, Container, Input, List, Select} from "./jokesStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    getJokes,
    getMoreJokes,
    setInitialRender, setSortedJokes,
    sortedJokesAction
} from "../../redux/store/joke-reducer";


const Jokes = () => {

    const jokesState = useSelector(({jokes}) => jokes)
    const dispatch = useDispatch()

    // const [jokes, setJokes] = useState([])
    // const [sortedJokes, setSortedJokes] = useState([])
    // const [categories, setCategories] = useState([])

    const [category, setCategory] = useState('all')
    const [numOfJokes, setNumOfJokes] = useState('')

    useEffect(() => {
        // const getJokes = async () => {
        //     try {
        //         // const res = await axios.get('http://api.icndb.com/jokes/random/3')
        //         // setJokes(res.data.value)
        //         // setSortedJokes(res.data.value)
        //         dispatch(getJokes())
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
        // getJokes()
        if (jokesState.initialRender) {
            try {
                dispatch(getJokes())
                dispatch(setInitialRender())
            } catch (err) {
                console.log(err)
            }
        }

    }, [dispatch, jokesState.initialRender])

    useEffect(() => {
        // const getCategories = async () => {
        //     const res = await axios.get('http://api.icndb.com/categories')
        //     setCategories(res.data.value)
        // }
        // getCategories()
        if (jokesState.initialRender) {
            try {
                dispatch(getCategories())
            } catch (err) {
                console.log(err)
            }
        }
    }, [dispatch, jokesState.initialRender])

    const handleClick = async () => {
        try {
            dispatch(getMoreJokes(numOfJokes))
        } catch (err) {
            console.log(err)
        }
        // const res = await axios.get(`http://api.icndb.com/jokes/random/${numOfJokes ? numOfJokes : 3}`)
        // const receivedJokes = res.data.value
        //
        // setJokes([...jokes, ...receivedJokes])
        // setSortedJokes([...jokes, ...receivedJokes].filter(joke => {
        //     if (category === 'all') {
        //         return joke
        //     } else {
        //         return joke.categories.includes(category)
        //     }
        // }))
    }

    const handleChange = (e) => {
        setNumOfJokes(e.target.value)
    }

    const onHandleCategoriesChange = e => {
        // const category = e.target.value
        // setCategory(category)
        // if (category === 'all') {
        //     setSortedJokes(jokes)
        // } else {
        //     setSortedJokes(jokes.filter(joke => {
        //         return joke.categories.includes(category)
        //     }))
        // }
        dispatch(setSortedJokes(e.target.value))
    }

    return (
        <Container>
            <Select onChange={onHandleCategoriesChange}>
                <option value="all">All</option>
                {jokesState.categories.map(category => {
                    return <option key={category}
                                   value={category}>{category[0].toUpperCase() + category.substring(1)}</option>
                })}
            </Select>
            <List>
                {jokesState.sortedJokes.map(joke => (
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