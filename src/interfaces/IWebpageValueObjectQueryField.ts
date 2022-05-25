import {EnumWebpageValueObjectQueryFieldType} from '@interfaces/EnumWebpageValueObjectQueryFieldType';

/**
 * Schema used for querying specified field on parent element.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IWebpageValueObjectQueryField {
    /**
     * Name of the property that would contain queried value.
     */
    identifier: string;

    /**
     * Child selector.
     * Concept similar to column in SQL databases.
     *
     * e.g. { selector: ".product",  fields: [{ selector: "#price" }] } will match product price.
     */
    selector: string;

    /**
     * Returned value type.
     */
    type?: EnumWebpageValueObjectQueryFieldType;
}