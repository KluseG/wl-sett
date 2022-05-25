import fetch from 'node-fetch';
import {IHttp} from '@interfaces/IHttp';
import {FetchResponse} from '@app/http/FetchResponse';
import {IResponse} from '@interfaces/IResponse';
import {injectable} from 'inversify';

/**
 * HttpService implementation using Fetch driver.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
@injectable()
export class FetchHttpService implements IHttp {
    /**
     * @inheritDoc
     */
    async get(url: string): Promise<IResponse> {
        const result = await fetch(url);

        // Convert Fetch response to IResponse
        const response = new FetchResponse(result.status, result.statusText);
        response.setBody(await result.text());

        return response;
    }
}