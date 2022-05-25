import {WebpageProductOptionsDataContext} from '@data-contexts/WebpageProductOptionsDataContext';
import {IWebpageValueObjectQuery} from '@interfaces/IWebpageValueObjectQuery';
import {DataFetchError} from '@errors/DataFetchError';
import {IWebpageValueObjectQueryResultData} from '@interfaces/IWebpageValueObjectQueryResultData';

const getHttp = (data: string, code: number, message: string, isSuccessful: boolean) => {
    return {
        get(url: string) {
            const response = {
                body: data,
                statusCode: code,
                statusMessage: message,
                setBody(body: string) {
                    this.body = body;
                },
                isSuccessful() {
                    return isSuccessful;
                },
            };

            return Promise.resolve(response);
        }
    };
};

const getValueObject = (content: Array<IWebpageValueObjectQueryResultData>) => {
    return {
        getData(query: IWebpageValueObjectQuery) {
            return {data: content};
        }
    };
};

const getWebpageProvider = (url: string, valueObjectReturnData: Array<IWebpageValueObjectQueryResultData>) => {
    return {
        get webpageUrl() {
            return url;
        }, createValueObject(htmlString: string) {
            return getValueObject(valueObjectReturnData);
        }
    };
};

test('listing with failed response', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('', 404, 'Resource not found', false), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', []));

    expect.assertions(2);

    try {
        const result = await dataContext.list(null);
    } catch (e) {
        expect(e).toBeInstanceOf(DataFetchError);
        expect((e as Error).message).toEqual('There was an error fetching data from `https://example.org`: Resource not found (404)');
    }
});

test('listing with success response and empty data', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('', 200, 'OK', true), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', []));

    const result = await dataContext.list(null);

    expect(result).toEqual([]);
});

test('listing with success response and empty query objects', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('>', 200, 'OK', true), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', [{}]));

    const result = await dataContext.list(null);

    expect(result).toEqual([]);
});

test('listing with success response and incomplete data', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('', 200, 'OK', true), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', [{
            header: 'Test header'
        }]));

    const result = await dataContext.list(null);

    expect(result).toEqual([{
        title: 'Test header',
        name: 'UNKNOWN',
        description: 'UNKNOWN',
        price: {currency: 'UNKNOWN', value: -1},
        price_type: 1,
        discount: null
    }]);
});

test('listing with success response and malformed data', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('', 200, 'OK', true), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', [{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            header: ['A nice header'], // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name: {key: 'value'}, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            description: NaN, price: 'asdf', // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            price_type: -1, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            discount: Symbol.for('a')
        }]));

    const result = await dataContext.list(null);

    expect(result).toEqual([{
        title: 'UNKNOWN',
        name: 'UNKNOWN',
        description: 'UNKNOWN',
        price: {currency: 'UNKNOWN', value: -1},
        price_type: 1,
        discount: {currency: 'UNKNOWN', value: -1}
    }]);
});

test('listing with success response and correct data', async () => {
    const dataContext = new WebpageProductOptionsDataContext(getHttp('', 200, 'OK', true), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getWebpageProvider('https://example.org', [{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            header: 'A header', // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name: 'A name', // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            description: 'A description', price: '£100', // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            price_type: 'Some text Per mOnTh', // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            discount: '£4'
        }]));

    const result = await dataContext.list(null);

    expect(result).toEqual([{
        title: 'A header',
        name: 'A name',
        description: 'A description',
        price: {currency: 'GBP', value: 100},
        price_type: 1,
        discount: {currency: 'GBP', value: 4}
    }]);
});