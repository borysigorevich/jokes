import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Jokes} from '../components/jokes/Jokes';
import {
	GET_MORE_JOKES,
	SagaActionsType, SENT_REQUEST,
	sentRequestType,
	setSortedJokesType,
	StateType
} from '../redux/ducks/jokes';
import {mockStore} from './utils';

Enzyme.configure({adapter: new EnzymeAdapter()});

export type actionsType = SagaActionsType | setSortedJokesType | sentRequestType

export type PropsType = {
    jokesState: StateType
    dispatch: (action: actionsType) => void
}

const createJokesComponent = (props: PropsType) => shallow(<Jokes {...props}/>);

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		joke: '2',
		category: 'all'
	}),
	useNavigate: () => ({
		push: jest.fn()
	})
}));

describe('Jokes', () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('snapshot', () => {
		const component = createJokesComponent(mockStore({}));
		expect(component).toMatchSnapshot();
	});

	it('should be one joke', () => {
		const component = createJokesComponent(mockStore({sortedJokes: [{id: 1, joke: 'haha', categories: ['nerdy']}]}));
		expect(component.find('.link').length).toEqual(1);
	});

	it('should be 2 categories', () => {
		const component = createJokesComponent(mockStore({categories: ['nerdy', 'explicit']}));
		expect(component.find('Styled(NavLink)').length).toEqual(3);
	});

	it('should be 2 calls of the dispatch on get joke button click', () => {
		const dispatched: Array<actionsType> = [];
		const component = createJokesComponent(mockStore({dispatch: (action: actionsType) => dispatched.push(action)}));
		const btn = component.find('Styled(Button)').at(0);
		btn.simulate('click');
		expect(dispatched).toEqual([{type: SENT_REQUEST}, {type: GET_MORE_JOKES, payload: '1'}]);
	});
});