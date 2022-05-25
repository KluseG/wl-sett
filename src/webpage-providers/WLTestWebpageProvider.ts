import {IWebpageProvider} from '@interfaces/IWebpageProvider';
import {IWebpageValueObject} from '@interfaces/IWebpageValueObject';
import {WebpageValueObject} from '@value-objects/WebpageValueObject';
import {WebpageContentToValueObjectConversionError} from '@errors/WebpageContentToValueObjectConversionError';
import {injectable} from 'inversify';

/**
 * Provides information about wltest website.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
@injectable()
export class WLTestWebpageProvider implements IWebpageProvider {
    /**
     * Webpage URL.
     */
    public static WL_TEST_WEBPAGE_URL = 'https://wltest.dns-systems.net/';

    /**
     * @inheritDoc
     */
    public get webpageUrl(): string {
        return WLTestWebpageProvider.WL_TEST_WEBPAGE_URL;
    }

    /**
     * @inheritDoc
     */
    public createValueObject(htmlString: string): IWebpageValueObject {
        try {
            return new WebpageValueObject(htmlString, this.webpageUrl);
        } catch (error) {
            let errorMessage: string;
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string' || typeof error === 'number') {
                errorMessage = error.toString();
            } else {
                errorMessage = JSON.stringify(error);
            }

            throw new WebpageContentToValueObjectConversionError(errorMessage);
        }
    }
}