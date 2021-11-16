import {act, fireEvent, getByRole, render, screen} from "@testing-library/react";
import AppTest from "./AppTest";


describe('react testing library', () => {

    test('first test', () => {
        render(<AppTest/>)
        screen.debug()
        expect(screen.getByText(/Search/i)).toBeInTheDocument()

    })

    test('event', async () => {
        render(<AppTest/>)
        await act(async () => {
            await screen.findByText(/Promise Resolve/i)
            expect(screen.queryByText(/Search for react/i)).toBeNull()
            fireEvent.change(screen.getByPlaceholderText('input'), {target: {value: 'for react'}})
            fireEvent.click(screen.getByText(/click/i))
            expect(screen.getByText(/search for react/i)).toBeInTheDocument()
        })

    })
})