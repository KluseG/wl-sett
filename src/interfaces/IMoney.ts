/**
 * Interface for exchanging pricing information.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IMoney {
    /**
     * Currency in ISO format (EUR, USD, GBP, etc.)
     */
    currency: string;

    /**
     * The monetary value.
     */
    value: number;
}