import {currencies} from '@app/currencies';
import {IMoney} from '@interfaces/IMoney';

/**
 * Use this method if you're sure the price
 * is the only thing that the string contains.
 *
 * Converts input, e.g. `$10` to IMoney interface.
 *
 * @param price
 */
export const processPrice = (price: string): IMoney => {
    for (const currencyCode in currencies) {
        const currencySymbol = currencies[currencyCode];

        if (price.includes(currencySymbol)) {
            return {
                currency: currencyCode,
                value: parseFloat(price.replace(currencySymbol, ''))
            };
        }
    }

    return { currency: 'UNKNOWN', value: -1 };
};