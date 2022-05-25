import {IResponse} from '@interfaces/IResponse';
import {InvalidArgumentError} from '@errors/InvalidArgumentError';

/**
 * IResponse implementation using Fetch driver.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class FetchResponse implements IResponse {
    /**
     * @inheritDoc
     */
    public body!: string;

    /**
     * @inheritDoc
     */
    public statusCode: number;

    /**
     * @inheritDoc
     */
    public statusMessage: string;

    /**
     * Creates FetchResponse instance.
     * Fails immediately if provided arguments does not pass validation.
     *
     * @param statusCode
     * @param statusMessage
     */
    constructor(statusCode: number, statusMessage: string) {
        // There are 5 groups of HTTP status codes:
        // - 1xx
        // - 2xx
        // - 3xx
        // - 4xx
        // - 5xx
        //
        // Everything else would be invalid.
        if (statusCode < 100 || statusCode >= 600) {
            throw new InvalidArgumentError('statusCode', 'FetchResponse', 'Status code should comply with RFC 7231 specification.');
        }
        this.statusCode = statusCode;

        // Every HTTP response should contain non-empty status text.
        if (statusMessage.length === 0) {
            throw new InvalidArgumentError('statusMessage', 'FetchResponse', 'Status message cannot be empty.');
        }
        this.statusMessage = statusMessage;
    }

    /**
     * @inheritDoc
     */
    public isSuccessful(): boolean {
        return this.statusCode >= 200 && this.statusCode < 300;
    }

    /**
     * @inheritDoc
     */
    public setBody(body: string): void {
        this.body = body;
    }
}