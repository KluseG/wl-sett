import {formatMessage} from '@helpers/format-message';

/**
 * DataProvider not provided error.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class DataProviderNotProvidedError extends Error {
    public name = 'DataProviderNotProvidedError';

    constructor() {
        super(formatMessage('errors.DataProviderNotProvidedError'));
    }
}