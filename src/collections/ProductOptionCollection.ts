import {ICollection} from '@interfaces/ICollection';
import {ProductOptionModel} from '@models/ProductOptionModel';

/**
 * Collection of ProductOption models.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class ProductOptionCollection implements ICollection<ProductOptionModel> {
    /**
     * Internal entity storage.
     *
     * @private
     */
    private items: Array<ProductOptionModel> = [];

    /**
     * Create ProductOptionCollection instance with or without models.
     *
     * @param items
     */
    constructor(items?: Array<ProductOptionModel>) {
        if (items) {
            this.items = items;
        }
    }

    /**
     * @inheritDoc
     */
    public add(model: ProductOptionModel): ProductOptionCollection {
        this.items.push(model);

        return this;
    }

    /**
     * @inheritDoc
     */
    public get(index: number): ProductOptionModel {
        return this.items[index];
    }

    /**
     * @inheritDoc
     */
    public sortBy(property: keyof ProductOptionModel, direction: 'ASC' | 'DESC' = 'ASC'): ICollection<ProductOptionModel> {
        // The positive number would push the item to the top, negative to the bottom,
        // so we need to swap that values. We could utilize strategy and create independent
        // sorting functions, but this implementation is enough for this particular use case.
        const realDirection = direction === 'ASC' ? [1, -1] : [-1, 1];

        this.items = this.items.sort((itemA, itemB) => {
            return itemA[property] >= itemB[property] ? realDirection[0] : realDirection[1];
        });

        return this;
    }

    /**
     * @inheritDoc
     */
    public toJSON(): string {
        let JSONString = '';

        // Custom JSON generation.
        // Because every model has its own `toJSON` method, we need
        // a way to utilize that method (it may create different output than default serialization).
        // Ideally, we would have a separate service, for example `JsonFormatter` implementing `format()`
        // to delegate the responsibility of ensuring a valid JSON structure.
        for (const item of this.items) {
            // Place a comma after previous `object`
            if (JSONString.length) {
                JSONString += ',';
            }

            JSONString += item.toJSON();
        }

        return `[${JSONString}]`;
    }
}