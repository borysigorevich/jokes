import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap';
import Jokes from './components/jokes/Jokes';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {ThemeProvider} from 'styled-components';
import {theme} from './styled/GlobalStyles';


function App() {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Container className='App py-3'>
                        <Routes>
                            <Route path={'/'} element={<Jokes/>}/>
                            <Route path={'/:category'} element={<Jokes/>}/>
                        </Routes>
                    </Container>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
