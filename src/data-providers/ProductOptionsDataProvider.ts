import {IDataProvider} from '@interfaces/IDataProvider';
import {IRepository} from '@interfaces/IRepository';
import {ProductOptionModel} from '@models/ProductOptionModel';

/**
 * DataProvider for product options.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class ProductOptionsDataProvider implements IDataProvider {
    /**
     * Creates ProductOptionsDataProvider instance.
     *
     * @param repository
     */
    constructor(protected readonly repository: IRepository<ProductOptionModel>) {}

    /**
     * @inheritDoc
     */
    public async provideAsString(): Promise<string> {
        // Get all product options
        const productOptions = await this.repository.all();

        // Request sorted data and return it as a string
        return productOptions.sortBy('annualPriceValue', 'DESC').toJSON();
    }
}