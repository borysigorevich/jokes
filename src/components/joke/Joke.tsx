import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../redux/store';

const Joke = () => {
    const jokesState = useSelector((state: RootState) => state.jokes);
    const dispatch = useDispatch();

    const params = useParams();

    useEffect(() => {
        try {

        } catch (err) {
            console.log(err)
        }
    }, [params.id, dispatch])

    return (
        <>
            <i>{jokesState.joke}</i>
        </>
    );
};

export default Joke