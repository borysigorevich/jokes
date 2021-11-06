import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {Container} from "./jokeStyles";
import axios from "axios";

const Joke = () => {
    const [joke, setJoke] = useState('')
    const params = useParams()

    useEffect(() => {
        const getJoke = async () => {
            const res = await axios.get('http://api.icndb.com/jokes/' + params.id)
            setJoke(res.data.value.joke)
        }
        getJoke()
    }, [params.id])

    return (
        <Container>
            <i>{joke}</i>
        </Container>
    );
};

export default Joke