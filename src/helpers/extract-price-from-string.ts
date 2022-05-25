import {currencies} from '@app/currencies';
import {IMoney} from '@interfaces/IMoney';

/**
 * Use this method if you're expecting the price
 * to be somewhere inside the input string.
 *
 * Converts input, e.g. `some string with $10 price` to IMoney interface.
 *
 * @param input
 */
export const extractPriceFromString = (input: string): IMoney => {
    for (const currencyCode in currencies) {
        const currencySymbol = currencies[currencyCode];

        if (input.includes(currencySymbol)) {
            const parts = input.split(' ');

            const price = parts.find(part => part.includes(currencySymbol)) || '';

            return {
                currency: currencyCode,
                value: parseFloat(price.replace(currencySymbol, ''))
            };
        }
    }

    return { currency: 'UNKNOWN', value: -1 };
};