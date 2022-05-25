import {IModel} from '@interfaces/IModel';
import {IMoney} from '@interfaces/IMoney';
import {EnumPriceType} from '@interfaces/EnumPriceType';

/**
 * Product option.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class ProductOptionModel implements IModel {
    /**
     * Create model instance.
     *
     * @param title
     * @param name
     * @param description
     * @param price
     * @param price_type
     * @param discount
     */
    constructor(
        private readonly title: string,
        private readonly name: string,
        private readonly description: string,
        private readonly price: IMoney,
        private readonly price_type: EnumPriceType,
        private readonly discount: IMoney | null
    ) {}

    /**
     * Calculate annual price of the product option.
     */
    public get annualPriceValue(): number {
        if (this.price_type === EnumPriceType.PER_YEAR) {
            // Provided price is already annual one, just return
            return this.price.value;
        }

        // Assuming that year has 12 months...
        return this.price.value * 12;
    }

    /**
     * Calculate the savings on the annual plan in percent.
     */
    public get savingsPercent(): number {
        if (!this.discount) {
            // There is no discount.
            return 0;
        }

        // Calculate the savings percentage and round it to 2 decimal places.
        return Math.round((((this.discount.value / (this.annualPriceValue + this.discount.value)) * 100) + Number.EPSILON) * 100) / 100;
    }

    /**
     * @inheritDoc
     */
    public toJSON(): string {
        return JSON.stringify({
            'option title': this.title,
            description: this.name,
            features: this.description,
            price: `${this.price.value} ${this.price.currency}`,
            'annual price': `${this.annualPriceValue} ${this.price.currency}`,
            discount: this.discount ? `${this.discount.value} ${this.discount.currency}` : 'N/A',
            savings: this.discount ? `${this.savingsPercent}%` : 'N/A',
        });
    }
}