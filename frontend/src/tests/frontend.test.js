import React, { useContext } from 'react';
import App from '../App';
import EntrancePage from '../pages/EntrancePage';
import { MockAppProvider, MockDispatch } from './testUtils';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AppActions, AppContext, AppProvider } from '../stores/App';
import { hooks} from '../utils/custom_hooks';
const mockAxios = new MockAdapter(axios);


describe('Unit', () => {
    afterEach(() => {
        cleanup()
        jest.clearAllMocks();
    });
    test('LogIn', async () => {
        jest.spyOn(window.localStorage.__proto__, 'setItem')
        jest.spyOn(window.localStorage.__proto__, 'getItem')
        const { getByTestId } = render(<MockAppProvider>
            <App ><EntrancePage /></App>
        </MockAppProvider>)
        await screen.findByText(/LOG IN/);
        await waitFor(async () => {
            userEvent.type(getByTestId('username'), 'smgcknt');
            userEvent.type(getByTestId('password'), 'abcdefg');
        });
        await waitFor(async () => {
            userEvent.click(getByTestId('login_btn'))
            mockAxios.onPost(`/user/login`).reply(200, "access_token");
            expect(MockDispatch).toHaveBeenCalledWith({ "payload": { "id": null, "name": null, "status": true }, "type": "SET_USER" });
        });
        await waitFor(async () => {
            expect(window.localStorage.setItem).toHaveBeenCalledWith("access_token", "access_token")
            expect(window.localStorage.getItem("access_token")).toBe("access_token");
        });
    });
    test('Auth', async () => {
        render(<AppProvider><App /></AppProvider>)
        await waitFor(async () => {
            mockAxios.onGet(`/user/auth`).reply(200, { id: 7, username: "smgcknt" });
            expect(screen.queryByText(/利用開始/)).toBeNull();
        });
        await waitFor(async () => {
            expect(await screen.findByText(/利用開始/)).toBeInTheDocument();
        });
        //screen.debug();
    });
    test('useAuthentification', async () => {
        mockAxios.onGet(`/user/auth`).reply(200, { id: 7, username: "smgcknt" });
        render(<MockAppProvider>
            <App />
        </MockAppProvider>)
        await waitFor(async () => {
            const { result } =renderHook(
                () => {
                    return hooks.useAuthentification({ "id": null, "name": null, "status": true }, MockDispatch, AppActions )
                }
            );
            expect(result.current.dispatch).toHaveBeenCalledWith({ "payload": { "id": 7, "name": "smgcknt", "status": true }, "type": "SET_USER" });
        });
    });

});
