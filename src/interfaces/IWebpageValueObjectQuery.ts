import {IWebpageValueObjectQueryField} from '@interfaces/IWebpageValueObjectQueryField';

/**
 * Schema the client should comply to in order to obtain webpage data.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IWebpageValueObjectQuery {
    /**
     * Fields we want to "select" from entity.
     * Concept similar to columns in SQL databases,
     * or document properties in non-SQL databases.
     */
    fields: Array<IWebpageValueObjectQueryField>;

    /**
     * Selector for entity.
     * Concept similar to table in SQL databases,
     * or document in non-SQL databases.
     *
     * e.g. { selector: ".product" } will match every product on webpage.
     */
    selector: string;
}