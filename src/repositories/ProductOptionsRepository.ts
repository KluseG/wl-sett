import {IRepository} from '@interfaces/IRepository';
import {IDataContext} from '@interfaces/IDataContext';
import {ProductOptionModel} from '@models/ProductOptionModel';
import {ProductOptionCollection} from '@collections/ProductOptionCollection';
import {IProductOption} from '@interfaces/IProductOption';

/**
 * Repository for ProductOption model.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class ProductOptionsRepository implements IRepository<ProductOptionModel> {
    /**
     * Create ProductOptionsRepository instance.
     *
     * @param dataContext
     */
    constructor(private readonly dataContext: IDataContext<IProductOption>) {
    }

    /**
     * @inheritDoc
     */
    async all(): Promise<ProductOptionCollection> {
        const productOptions = await this.dataContext.list(null);

        return this.collect(productOptions);
    }

    /**
     * Transforms raw product options data to collection
     * of the ProductOptionModels.
     *
     * @param data
     * @protected
     */
    protected collect(data: Array<IProductOption>) {
        const collection = new ProductOptionCollection();

        for (const option of data) {
            collection.add(new ProductOptionModel(option.title, option.name, option.description, option.price, option.price_type, option.discount));
        }

        return collection;
    }
}