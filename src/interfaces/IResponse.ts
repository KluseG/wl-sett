/**
 * Generic HTTP Response interface.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IResponse {
    /**
     * Response status text (HTTP).
     */
    body: string;

    /**
     * Response body.
     */
    statusCode: number;

    /**
     * Response status (HTTP).
     */
    statusMessage: string;

    /**
     * Determines whether the request (and therefore the response)
     * can be considered successful.
     */
    isSuccessful(): boolean

    /**
     * Sets the response body.
     *
     * @param body
     */
    setBody(body: string): void;
}