import {formatMessage} from '@helpers/format-message';

/**
 * Webpage content to Value Object conversion error.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class WebpageContentToValueObjectConversionError extends Error {
    public name = 'WebpageContentToValueObjectConversionError';

    constructor(errorMessage: string) {
        super(formatMessage('errors.WebpageContentToValueObjectConversionError', {
            errorMessage
        }));
    }
}