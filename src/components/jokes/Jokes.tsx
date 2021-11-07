import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Container, Input, List, Select} from "./jokesStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    getJokes,
    getMoreJokes, JokeType,
    setInitialRender, setSortedJokes
} from "../../redux/store/joke-reducer";
import {RootState} from "../../redux/store/store";


const Jokes = () => {

    const jokesState = useSelector((state: RootState) => state.jokes)
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

    const handleChange = (e: any) => {
        setNumOfJokes(e.target.value)
    }

    const onHandleCategoriesChange = (e: any) => {
        dispatch(setSortedJokes(e.target.value))
    }

    return (
        <Container>
            <Select onChange={onHandleCategoriesChange}>
                <option value="all">All</option>
                {jokesState.categories.map((category: string) => {
                    return <option key={category}
                                   value={category}>{category[0].toUpperCase() + category.substring(1)}</option>
                })}
            </Select>
            <span>Choose the category</span>
            <List>
                {jokesState.sortedJokes.map((joke: JokeType) => (
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