import {extractPriceFromString} from '@helpers/extract-price-from-string';
import {processPrice} from '@helpers/process-price';
import {formatMessage} from '@helpers/format-message';

test('extract price from long string', () => {
    expect(extractPriceFromString('I am a long string £123 that contains a price')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(extractPriceFromString('I am a long string £123.99 that contains a price')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(extractPriceFromString('I am a long string 123£ that contains a price')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(extractPriceFromString('I am a long string 123.99£ that contains a price')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(extractPriceFromString('£123')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(extractPriceFromString('123£')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(extractPriceFromString('£123.99')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(extractPriceFromString('123.99£')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(extractPriceFromString('$100')).toEqual({
        value: -1, currency: 'UNKNOWN'
    });
});

test('process price', () => {
    expect(processPrice('£123')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(processPrice('123£')).toEqual({
        value: 123, currency: 'GBP'
    });

    expect(processPrice('£123.99')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(processPrice('123.99£')).toEqual({
        value: 123.99, currency: 'GBP'
    });

    expect(processPrice('$100')).toEqual({
        value: -1, currency: 'UNKNOWN'
    });
});

test('formatting messages', () => {
    expect(formatMessage('errors.DataFetch', {
        resourceName: 'A',
        statusMessage: 'B',
        statusCode: 'C'
    })).toEqual('There was an error fetching data from `A`: B (C)');

    expect(formatMessage('errors.WebpageContentToValueObjectConversionError', {
        errorMessage: 'A'
    })).toEqual('There was an error converting webpage to Value Object: A');

    expect(formatMessage('errors.InvalidArgumentError', {
        argumentName: 'A',
        parentName: 'B',
        reason: 'C'
    })).toEqual('Invalid argument `A` provided for `B`: C');

    expect(formatMessage('errors.OutputterNotProvidedError')).toEqual('No Outputter was provided.');

    expect(formatMessage('errors.DataProviderNotProvidedError')).toEqual('No DataProvider was provided.');
});