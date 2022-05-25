import {IWebpageValueObject} from '@interfaces/IWebpageValueObject';

/**
 * Provides information about specific webpage.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IWebpageProvider {
    /**
     * Page url.
     */
    get webpageUrl(): string;

    /**
     * Creates Value Object using webpage's HTML.
     *
     * @param htmlString
     */
    createValueObject(htmlString: string): IWebpageValueObject;
}