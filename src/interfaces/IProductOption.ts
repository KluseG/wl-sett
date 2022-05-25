import {EnumPriceType} from '@interfaces/EnumPriceType';
import {IMoney} from '@interfaces/IMoney';

/**
 * Product option raw data schema.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IProductOption {
    /**
     * Product long description.
     */
    description: string;

    /**
     * Product discount.
     */
    discount: IMoney | null

    /**
     * Product short description.
     */
    name: string;

    /**
     * Product pricing.
     */
    price: IMoney;

    /**
     * Monthly or annual subscription.
     */
    price_type: EnumPriceType;

    /**
     * Product title.
     */
    title: string;
}