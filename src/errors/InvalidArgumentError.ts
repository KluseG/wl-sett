import {formatMessage} from '@helpers/format-message';

/**
 * Invalid argument error.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class InvalidArgumentError extends Error {
    public name = 'InvalidArgumentError';

    constructor(argumentName: string, parentName: string, reason: string) {
        super(formatMessage('errors.InvalidArgumentError', {
            argumentName,
            parentName,
            reason,
        }));
    }
}