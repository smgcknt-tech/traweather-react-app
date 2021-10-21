import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockAppProvider, MockDispatch } from './testUtils';
import { AppActions,AppProvider } from '../AppStore';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import { hooks } from '../utils/custom_hooks';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import MarketPage from '../pages/MarketPage';
import LogInForm from '../components/forms/LogInForm';
const mockAxios = new MockAdapter(axios);

describe.skip('Unit', () => {
    afterEach(() => {
        cleanup()
        jest.clearAllMocks();
    });
    test('LogIn', async () => {
        jest.spyOn(window.localStorage.__proto__, 'setItem')
        jest.spyOn(window.localStorage.__proto__, 'getItem')
        const { getByTestId } = render(
            <MockAppProvider>
                <BrowserRouter><LogInForm /></BrowserRouter>
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
            //expect(screen.queryByText(/利用開始/)).toBeNull();
        });
        await waitFor(async () => {
            expect(await screen.findByText(/利用開始/)).toBeInTheDocument();
        });
        //screen.debug();
    });
    test('useAuthentification', async () => {
        mockAxios.onGet(`/user/auth`).reply(200, { id: 7, username: "smgcknt" });
        render(<MockAppProvider><App /></MockAppProvider>)
        await waitFor(async () => {
            const { result } = renderHook(
                () => {
                    return hooks.useAuthentification({ "id": null, "name": null, "status": true }, MockDispatch, AppActions)
                }
            );
            expect(result.current.dispatch).toHaveBeenCalledWith({ "payload": { "id": 7, "name": "smgcknt", "status": true }, "type": "SET_USER" });
        });
    });
    test('MarketPredictionForm', async () => {
        mockAxios.onGet(`/user/auth`).reply(200, { id: 7, username: "smgcknt" });
        mockAxios.onPost(`/api/create_prediction`).reply(200, "created data");
        const { getByTestId } = render(<MockAppProvider><BrowserRouter><MarketPage /></BrowserRouter></MockAppProvider>)
        await waitFor(async () => {
            userEvent.type(getByTestId('予想'), '　米国では長期金利の低下を受けてハイテク株に買いが入った。プラスとはならなかったダウ平均も、序盤に200ドル以上下げたところから横ばいまで....');
            userEvent.type(getByTestId('戦略'), '足元ではインフレへの警戒が強まり、グロース株を買いづらくなっているため、金利上昇にはブレーキがかかった方が、日米とも全体市場には良い影響を及ぼすと考え...');
            userEvent.type(getByTestId('注目セクター'), '半導体');
            userEvent.click(getByTestId('submit_btn'))
        });
        await waitFor(async () => {
            expect(MockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING", payload: false });
        });
    });

});
