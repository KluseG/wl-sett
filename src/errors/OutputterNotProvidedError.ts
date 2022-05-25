import {formatMessage} from '@helpers/format-message';

/**
 * Outputter not provided error.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class OutputterNotProvidedError extends Error {
    public name = 'OutputterNotProvidedError';

    constructor() {
        super(formatMessage('errors.OutputterNotProvidedError'));
    }
}