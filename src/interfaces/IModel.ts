/**
 * Generic Model interface.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IModel {
    /**
     * Returns Model data as a JSON resource.
     */
    toJSON(): string;
}