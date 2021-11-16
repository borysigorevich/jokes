import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import Jokes from './components/jokes/Jokes';
import {store} from './redux/store';
import {theme} from './styled/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <Container className='App py-3'>
                    <Routes>
                        <Route path={'/'} element={<Jokes/>}/>
                        <Route path={'/:category'} element={<Jokes/>}/>
                        <Route path={'/joke/:joke'} element={<Jokes/>}/>
                    </Routes>
                </Container>
            </Router>
        </Provider>
    </ThemeProvider>
);

export default App;
