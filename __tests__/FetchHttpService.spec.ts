import 'reflect-metadata';

jest.mock('node-fetch');

import fetch from 'node-fetch';
const {Response} = jest.requireActual('node-fetch');

import {FetchHttpService} from '@http/FetchHttpService';

test('response data matches the success response', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response('', {
        status: 200,
        statusText: 'OK'
    })));

    const http = new FetchHttpService();
    const response = await http.get('https://google.com');

    expect(fetch).toHaveBeenCalledWith('https://google.com');

    expect(response.body).toEqual('');
    expect(response.statusCode).toEqual(200);
    expect(response.statusMessage).toEqual('OK');
    expect(response.isSuccessful()).toBeTruthy();
});

test('response data matches the failed response', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response('', {
        status: 404,
        statusText: 'Not Found'
    })));

    const http = new FetchHttpService();
    const response = await http.get('https://google.com');

    expect(fetch).toHaveBeenCalledWith('https://google.com');

    expect(response.body).toEqual('');
    expect(response.statusCode).toEqual(404);
    expect(response.statusMessage).toEqual('Not Found');
    expect(response.isSuccessful()).toBeFalsy();
});