import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {Container} from "./jokeStyles";
import {useDispatch, useSelector} from "react-redux";
import {getJoke} from "../../redux/store/joke-reducer";
import {RootState} from "../../redux/store/store";

const Joke = () => {
    const jokesState = useSelector((state: RootState) => state.jokes)
    const dispatch = useDispatch()

    const params = useParams()

    console.log(params)

    useEffect(() => {
        try {
            dispatch(getJoke(params.id))
        } catch (err) {
            console.log(err)
        }
    }, [params.id, dispatch])

    return (
        <Container>
            <i>{jokesState.joke}</i>
        </Container>
    );
};

export default Joke