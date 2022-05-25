import {IWebpageValueObjectQuery} from '@interfaces/IWebpageValueObjectQuery';
import {IWebpageValueObjectQueryResult} from '@interfaces/IWebpageValueObjectQueryResult';
import {IWebpageValueObjectQueryResultData} from '@interfaces/IWebpageValueObjectQueryResultData';

/**
 * Immutable representation of scrapped webpage.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IWebpageValueObject {
    /**
     * Searches for specified webpage portions.
     *
     * @param query
     */
    getData<T extends IWebpageValueObjectQueryResultData>(query: IWebpageValueObjectQuery): IWebpageValueObjectQueryResult<T>;
}