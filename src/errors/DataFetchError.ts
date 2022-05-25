import {formatMessage} from '@helpers/format-message';

/**
 * Data fetch error.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class DataFetchError extends Error {
    public name = 'DataFetchError';

    constructor(statusCode: number, statusMessage: string, resourceName: string) {
        super(formatMessage('errors.DataFetch', {
            statusCode: statusCode.toString(),
            statusMessage,
            resourceName
        }));
    }
}