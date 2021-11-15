import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Jokes from "../components/jokes/Jokes";
import {
    GET_MORE_JOKES,
    SagaActionsType, SENT_REQUEST,
    sentRequestType,
    setSortedJokesType,
    StateType
} from "../redux/ducks/jokes";
import JokesTestVersion from "./JokesTestVersion";

Enzyme.configure({adapter: new EnzymeAdapter()})

export type actionsType = SagaActionsType | setSortedJokesType | sentRequestType

export type PropsType = {
    jokesState: StateType
    dispatch: (action: actionsType) => void
}

const createJokesComponent = (props: PropsType) => shallow(<JokesTestVersion {...props}/>)

describe('Jokes', () => {

    it('Three jokes after fetch', () => {
        const mockStore = {
            jokesState: {
                jokes: [
                    {id: 1, joke: 'haha', categories: ['nerdy']},
                    {id: 2, joke: 'haha', categories: ['nerdy']},
                    {id: 3, joke: 'haha', categories: ['nerdy']}],
                sortedJokes: [
                    {id: 1, joke: 'haha', categories: ['nerdy']},
                    {id: 2, joke: 'haha', categories: ['nerdy']},
                    {id: 3, joke: 'haha', categories: ['nerdy']}],
                categories: [],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: (action: actionsType) => {

            }
        }
        const component = createJokesComponent(mockStore)
        expect(component.find('.link').length).toEqual(3)
    })

    it('No jokes', () => {
        const mockStore = {
            jokesState: {
                jokes: [],
                sortedJokes: [],
                categories: [],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: (action: actionsType) => {

            }
        }
        const component = createJokesComponent(mockStore)
        expect(component.find('.link').length).toEqual(0)
    })

    it('Three categories', () => {
        const mockStore = {
            jokesState: {
                jokes: [],
                sortedJokes: [],
                categories: ['nerdy', 'explicit'],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: (action: actionsType) => {

            }
        }
        const component = createJokesComponent(mockStore)
        expect(component.find('.category').length).toEqual(3)
    })

    it('One category', () => {
        const mockStore = {
            jokesState: {
                jokes: [],
                sortedJokes: [],
                categories: [],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: (action: actionsType) => {

            }
        }
        const component = createJokesComponent(mockStore)
        expect(component.find('.category').length).toEqual(1)
    })

    it('Get more jokes button', () => {
        const dispatched: Array<actionsType> = []

        const mockStore = {
            jokesState: {
                jokes: [],
                sortedJokes: [],
                categories: ['nerdy', 'explicit'],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: (action: actionsType) => {
                dispatched.push(action)
            }
        }

        const component = createJokesComponent(mockStore)
        const btn = component.find('.one_joke')
        btn.simulate('click')
        expect(dispatched).toEqual([{type: SENT_REQUEST}, {type: GET_MORE_JOKES, payload: '1'}])
    })

    it('Show the correct joke', () => {
        const mockStore = {
            jokesState: {
                jokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
                sortedJokes: [{id: 1, joke: 'haha', categories: ['nerdy']}],
                categories: [],
                category: 'all',
                initialRender: true,
                joke: '',
                isLoading: true,
                error: {message: ''}
            },
            dispatch: jest.fn()
        }
        const component = createJokesComponent(mockStore)
        expect(component.find('ModalBody').text()).toEqual(mockStore.jokesState.jokes[0].joke)
    })
})