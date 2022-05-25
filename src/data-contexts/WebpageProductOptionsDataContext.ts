import {IDataContext} from '@interfaces/IDataContext';
import {IHttp} from '@interfaces/IHttp';
import {ICriteria} from '@interfaces/ICriteria';
import {DataFetchError} from '@errors/DataFetchError';
import {IWebpageValueObject} from '@interfaces/IWebpageValueObject';
import {IWebpageProvider} from '@interfaces/IWebpageProvider';
import {IProductOption} from '@interfaces/IProductOption';
import {processPrice} from '@helpers/process-price';
import {EnumPriceType} from '@interfaces/EnumPriceType';
import {extractPriceFromString} from '@helpers/extract-price-from-string';

/**
 * Data Context for product options that are obtained through scrapping a webpage.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class WebpageProductOptionsDataContext implements IDataContext<IProductOption> {
    /**
     * Local cache to avoid running the same requests without the need to do so.
     *
     * @protected
     */
    protected data: IWebpageValueObject | null = null;

    /**
     * Create WebpageProductOptionsDataContext instance.
     *
     * @param http
     * @param webpageProvider
     */
    constructor(protected readonly http: IHttp, protected readonly webpageProvider: IWebpageProvider) {
    }

    /**
     * @inheritDoc
     */
    public async list(criteria: ICriteria | null): Promise<Array<IProductOption>> {
        const productOptions = await this.getWebpageData();

        // Return every row if no criteria was supplied
        if (!criteria) {
            return productOptions;
        }

        // @TODO: use criteria for filtering and sorting!
        return productOptions.filter((item) => item).sort(() => 0);
    }

    /**
     * Converts the provided HTML into immutable Value Object.
     *
     * @param htmlString
     * @protected
     */
    protected convertWebpageContentToValueObject(htmlString: string): IWebpageValueObject {
        return this.webpageProvider.createValueObject(htmlString);
    }

    /**
     * Fetches and caches the HTML.
     *
     * @protected
     */
    protected async fetchWebpage(): Promise<IWebpageValueObject> {
        // Fetch data only if there is no cached response
        if (!this.data) {
            const response = await this.http.get(this.webpageProvider.webpageUrl);

            // For some reason the request failed,
            // so there is no point in continuing the program execution
            if (!response.isSuccessful()) {
                throw new DataFetchError(response.statusCode, response.statusMessage, this.webpageProvider.webpageUrl);
            }

            // Cache response
            this.data = this.convertWebpageContentToValueObject(response.body);
        }

        return this.data;
    }

    /**
     * Extracts data from webpage,
     * and transforms its contents to comply
     * with `IProductOption` interface.
     *
     * @protected
     */
    protected async getWebpageData(): Promise<Array<IProductOption>> {
        const webpage = await this.fetchWebpage();

        // Extract data from webpage
        return this.queryProductOptions(webpage)
            // Filter out options that have none of the required values
            .filter(data => {
                return typeof data === 'object' && data !== null && (data.header || data.name || data.description || data.price || data.priceDetails || data.discount);
            })
            // Transform options to comply with `IProductOption` interface.
            // Defensive programming and extra safety is required,
            // because we do not have control over the types of values obtained
            // from the webpage.
            // TypeScript's types are not enough in the case of fetching data from third-party services!
            .map(data => {
                const defaultValue = 'UNKNOWN';

                const title = data.header || defaultValue;
                const name = data.name || defaultValue;
                const description = data.description || defaultValue;
                const price = data.price || defaultValue;
                const priceDetails = data.priceDetails || defaultValue;
                const priceType = typeof priceDetails === 'string' ? (priceDetails.toLowerCase().includes('per month') ? EnumPriceType.PER_MONTH : EnumPriceType.PER_YEAR) : EnumPriceType.PER_MONTH;

                // We want to make sure that the values are of type string.
                // Every truthy value (such as arrays and objects) would be included otherwise.
                const mapped: IProductOption = {
                    title: typeof title === 'string' ? title : defaultValue,
                    name: typeof name === 'string' ? name : defaultValue,
                    description: typeof description === 'string' ? description : defaultValue,
                    price: typeof price === 'string' ? processPrice(price) : processPrice(''),
                    price_type: priceType,
                    discount: null
                };

                if (data.discount) {
                    mapped.discount = extractPriceFromString(typeof data.discount === 'string' ? data.discount : '');
                }

                return mapped;
            });
    }

    /**
     * Performs query on a downloaded webpage.
     *
     * @param webpage
     * @protected
     */
    protected queryProductOptions(webpage: IWebpageValueObject) {
        const queryResult = webpage.getData<{
            header: string; name: string; description: string; price: string; priceDetails: string; discount?: string;
        }>({
            selector: '.package', fields: [{
                selector: '.header > h3', identifier: 'header'
            }, {
                selector: '.package-name', identifier: 'name'
            }, {
                selector: '.package-description', identifier: 'description'
            }, {
                selector: '.price-big', identifier: 'price'
            }, {
                selector: '.package-price', identifier: 'priceDetails'
            }, {
                selector: '.package-price > p', identifier: 'discount'
            }]
        });

        if (!queryResult.data) {
            return [];
        }

        return queryResult.data;
    }
}