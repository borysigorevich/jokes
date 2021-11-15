import React, {useEffect, useState} from "react";
import {
    getCategories,
    getJokes,
    getMoreJokes,
    JokeType, SagaActionsType, sentRequestType,
    setIsLoading,
    setSortedJokes, setSortedJokesType,
    StateType
} from "../redux/ducks/jokes";
import {CustomButton, CustomNavbar, CustomNavbarBrand, CustomNavLink, FlexDiv, Styles} from "../styled/JokesStyled";
import {Button, CardGroup, ListGroup, Modal, Nav, Navbar, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

type JokesProps = {
    jokesState: StateType
    dispatch: (action: SagaActionsType | setSortedJokesType | sentRequestType) => void
}

const JokesTestVersion = ({jokesState, dispatch}: JokesProps) => {

    const params = {category: 'all', joke: '1'}

    if (params.joke) {
        const joke = jokesState.jokes.find(joke => joke.id === parseInt(params.joke!))
        joke && localStorage.setItem('joke', JSON.stringify(joke))
    }

    const [show, setShow] = useState<boolean>(!!params.joke);

    const handleClose = () => {
        localStorage.removeItem('joke')
        setShow(false)
    }

    const handleShow = () => setShow(true)

    useEffect(() => {
        if (jokesState.initialRender) {
            dispatch(getJokes(params.category ? params.category : 'all',
                jokesState.jokes.length > 0 ? '2' : '3'))
            dispatch(getCategories())
        }
    }, [dispatch, jokesState.initialRender, params.category, jokesState.jokes.length])

    useEffect(() => {
        params.category && dispatch(setSortedJokes(params.category))
    }, [dispatch, params.category])

    useEffect(() => {
        jokesState.error.message && setShow(true)
    }, [jokesState.error])

    const handleClick = async (numOfJokes: string) => {
        dispatch(setIsLoading())
        dispatch(getMoreJokes(numOfJokes))
    }

    return (
        <Styles>
            <CustomNavbar expand="md" className="justify-content-between">
                <CustomNavbarBrand>Choose the category</CustomNavbarBrand>
                <Navbar.Toggle aria-controls="navbar"/>
                <Navbar.Collapse id="navbar" className="justify-content-end">
                    <Nav>
                        <CustomNavLink as={Link}
                                       key="all"
                                       to="/all"
                                       className="mb-2 mt-3 mt-sm-0 mb-md-0 me-md-2 category"
                        >All</CustomNavLink>
                        {jokesState.categories.map((category: string, index) =>
                            <CustomNavLink as={Link}
                                           key={category}
                                           className={`mb-${jokesState.categories.length - 1 === index ? 0 : 2}
                                            mb-md-0 me-md-${jokesState.categories.length - 1 === index ? 0 : 2} category`}
                                           to={'/' + category}>
                                {category[0].toUpperCase() + category.substring(1)}</CustomNavLink>)}
                    </Nav>
                </Navbar.Collapse>
            </CustomNavbar>
            <CardGroup className="justify-content-center">
                <ListGroup as="ul" className="w-100">
                    {jokesState.sortedJokes.length > 0
                        ? jokesState.sortedJokes.map((joke: JokeType) => (
                            <Link className="link" key={joke.id} to={'/joke/' + joke.id}>
                                <ListGroup.Item onClick={handleShow} as="li"
                                                className="border border-secondary my-1 rounded clickable-item">
                                    {joke.joke.length > 100 ? joke.joke.substring(0, 100) + '...' : joke.joke}
                                </ListGroup.Item>
                            </Link>))
                        : <p className="fs-3 text-secondary">Ooops!! There are no jokes! Get Some!</p>
                    }
                </ListGroup>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    className={'modal-component'}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Joke</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {jokesState.error.message
                            ? jokesState.error.message
                            : jokesState.jokes.filter(joke => parseInt(params.joke!) === joke.id)[0]?.joke
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </CardGroup>
            <FlexDiv>
                {jokesState.isLoading && <Spinner animation="border"/>}
            </FlexDiv>
            <FlexDiv>
                <CustomButton className="btn-secondary one_joke"
                              onClick={() => handleClick('1')}>Get One Joke!</CustomButton>
                <CustomButton className="btn-secondary two_jokes"
                              onClick={() => handleClick('3')}>Get Three
                    Jokes!</CustomButton>
                <CustomButton className="btn-secondary three_jokes"
                              onClick={() => handleClick('5')}>Get Five
                    Jokes!</CustomButton>
            </FlexDiv>
        </Styles>
    );
};

export default JokesTestVersion