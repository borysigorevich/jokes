// import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Col, Container, Row} from "react-bootstrap";
import Jokes from "./components/jokes/Jokes";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Joke from "./components/joke/Joke";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Container className="App">
                    <Routes>
                        <Route path={'/'} element={<Jokes/>}/>
                        <Route path={'/joke/:id'} element={<Joke/>}/>
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
}

export default App;
