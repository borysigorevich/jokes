import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Container, Input, List, Select} from "./jokesStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    getJokes,
    getMoreJokes,
    setInitialRender, setSortedJokes,
} from "../../redux/store/joke-reducer";


const Jokes = () => {

    const jokesState = useSelector(({jokes}) => jokes)
    const dispatch = useDispatch()
    const [numOfJokes, setNumOfJokes] = useState('')

    useEffect(() => {
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
    }

    const handleChange = (e) => {
        setNumOfJokes(e.target.value)
    }

    const onHandleCategoriesChange = e => {
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
            <span>Choose the category</span>
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
                   placeholder={'How many jokes you want to get?'}/>
            <Button onClick={handleClick}>Get more jokes!</Button>
        </Container>
    );
};

export default Jokes