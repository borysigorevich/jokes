import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {CardGroup, ListGroup, Nav, Navbar, OverlayTrigger, Popover} from 'react-bootstrap';
import {
    getCategories,
    getJokes,
    getMoreJokes, JokeType,
    setInitialRender, setSortedJokes
} from '../../redux/store/joke-reducer';
import {RootState} from '../../redux/store/store';
import {CustomButton, CustomNavLink, FlexDiv, Styles} from '../../styled/JokesStyled';


const Jokes = () => {

    const jokesState = useSelector((state: RootState) => state.jokes)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if (jokesState.initialRender) {
            try {
                dispatch(getJokes(params.category ? params.category : 'all'))
                dispatch(setInitialRender())
            } catch (err) {
                console.log(err)
            }
        }
    }, [dispatch, jokesState.initialRender, params.category])

    useEffect(() => {
        try {
            params.category && dispatch(setSortedJokes(params.category))
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, params.category])

    useEffect(() => {
        if (jokesState.initialRender) {
            try {
                dispatch(getCategories())
            } catch (err) {
                console.log(err)
            }
        }
    }, [dispatch, jokesState.initialRender])

    const handleClick = async (numOfJokes: string) => {
        try {
            dispatch(getMoreJokes(numOfJokes))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Styles>
            <Navbar expand={'md'} className={'justify-content-between'}>
                <Navbar.Brand>Choose the category</Navbar.Brand>
                <Navbar.Toggle aria-controls={'navbar'}/>
                <Navbar.Collapse id={'navbar'} className={'justify-content-end'}>
                    <Nav>
                        <CustomNavLink as={Link}
                                       key={'all'}
                                       to={'/all'}
                                       className={'mb-2 mt-3 mt-sm-0 mb-md-0 me-md-2'}
                        >All</CustomNavLink>
                        {jokesState.categories.map((category: string, index) => <CustomNavLink as={Link}
                                                                                        key={category}
                                                                                        className={`mb-2 mb-md-0 me-md-${jokesState.categories.length - 1 === index ? 0 : 2}`}
                                                                                        to={'/' + category}>{category[0].toUpperCase() + category.substring(1)}</CustomNavLink>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <CardGroup className={'justify-content-center'}>
                <ListGroup as={'ul'} className={'w-100'}>
                    {jokesState.sortedJokes.length > 0
                        ? jokesState.sortedJokes.map((joke: JokeType) => (
                            <OverlayTrigger
                                trigger={'click'}
                                key={joke.id}
                                placement={'bottom'}
                                overlay={
                                    <Popover>
                                        <Popover.Body>
                                            {joke.joke}
                                        </Popover.Body>
                                    </Popover>
                                }>
                                <ListGroup.Item as={'li'} key={joke.id}
                                                className={'border border-secondary my-1 rounded'}>
                                    {joke.joke.length > 100 ? joke.joke.substring(0, 100) + '...' : joke.joke}
                                </ListGroup.Item>
                            </OverlayTrigger>))
                        : <p className={'fs-3 text-secondary'}>Ooops!! There are no jokes! Get Some!</p>
                    }
                </ListGroup>
            </CardGroup>
            <FlexDiv>
                <CustomButton className={'btn-secondary'} onClick={() => handleClick('1')}>Get One Joke!</CustomButton>
                <CustomButton className={'btn-secondary'} onClick={() => handleClick('3')}>Get Three
                    Jokes!</CustomButton>
                <CustomButton className={'btn-secondary'} onClick={() => handleClick('5')}>Get Five Jokes!</CustomButton>
            </FlexDiv>
        </Styles>
    );
};

export default Jokes