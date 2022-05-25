import {DataFetchError} from '@errors/DataFetchError';
import {DataProviderNotProvidedError} from '@errors/DataProviderNotProvidedError';
import {InvalidArgumentError} from '@errors/InvalidArgumentError';
import {OutputterNotProvidedError} from '@errors/OutputterNotProvidedError';
import {WebpageContentToValueObjectConversionError} from '@errors/WebpageContentToValueObjectConversionError';

test('data fetch error', () => {
    expect(() => {
        throw new DataFetchError(0, 'A', 'B');
    }).toThrow('There was an error fetching data from `B`: A (0)');
});

test('data provider not provided error', () => {
    expect(() => {
        throw new DataProviderNotProvidedError();
    }).toThrow('No DataProvider was provided.');
});

test('invalid argument error', () => {
    expect(() => {
        throw new InvalidArgumentError('A', 'B', 'C');
    }).toThrow('Invalid argument `A` provided for `B`: C');
});

test('outputter not provided error', () => {
    expect(() => {
        throw new OutputterNotProvidedError();
    }).toThrow('No Outputter was provided.');
});

test('webpage content to value object conversion error', () => {
    expect(() => {
        throw new WebpageContentToValueObjectConversionError('A');
    }).toThrow('here was an error converting webpage to Value Object: A');
});