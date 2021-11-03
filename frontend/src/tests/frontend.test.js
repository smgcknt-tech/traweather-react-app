import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from "@testing-library/react-hooks";
import { BrowserRouter } from 'react-router-dom';
import { MockAppProvider, MockDispatch } from './testUtils';
import { AppActions, AppProvider } from '../AppStore';
import { hooks } from '../utils/custom_hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockAxios = new MockAdapter(axios);

describe.skip('Unit', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('User can go to topPage when they click logo in header', async () => {
        //TBD
    });
    test('User can change pageby clicking button in sidebar', async () => {
        //TBD
    });
    test('User can see loading while api is working', async () => {
        //TBD
    });
    test('User can see proper error message while error happen', async () => {
        //TBD
    });
    test('User can see topPage and username after login', async () => {
        //TBD
    });
    test('User can stay loggedIn even after they close browser', async () => {
        //TBD
    });
    test('User can see topPage after register', async () => {
        //TBD
    });
    test('User is redirected to loginPage after they logout', async () => {
        //TBD
    });
    test('User can use fullwidth in form', async () => {
        //TBD
    });
    test('User can see selectedStocks chart data when they click it in planTabel and resultTable ', async () => {
        //TBD
    });
    test('User can change planTable and resultTable by pagenation ', async () => {
        //TBD
    });
    test('User cant create  prediction once a day', async () => {
        //TBD
    });
    test('User can see prediction in planPage after they create it', async () => {
        //TBD
    });
    test('User cant create planData when they search stock that doest exist in stock-data', async () => {
        //TBD
    });
    test('User cant use resultPage before they create planData', async () => {
        //TBD
    });
    test('User can see feedback in reflectPage after they create it in resultPage ', async () => {
        //TBD
    });
    test('User can see message "振返メッセージがありません" in reflectPage they hasnt created feedback. ', async () => {
        //TBD
    });
    test('User is redirected to notFoundPage when they link to a link that does not exist.', async () => {
        //TBD
    });
    test('User cant upload anything but image', async () => {
        //TBD
    });
    test('User cant post feed_back more than once a day', async () => {
        //TBD
    });

});
