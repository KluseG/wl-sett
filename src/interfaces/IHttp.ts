import {IResponse} from '@interfaces/IResponse';

/**
 * Generic Http interface
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IHttp {
    /**
     * Performs GET HTTP request.
     *
     * @param url
     */
    get(url: string): Promise<IResponse>
}