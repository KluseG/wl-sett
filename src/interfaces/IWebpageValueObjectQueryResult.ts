import {IWebpageValueObjectQueryResultData} from '@interfaces/IWebpageValueObjectQueryResultData';

/**
 * Query result.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IWebpageValueObjectQueryResult<T extends IWebpageValueObjectQueryResultData> {
    /**
     * Array of fields found for specified entity.
     * Returns `null` if entity wasn't found, or none of the provided fields were found.
     */
    data: Array<T> | null
}