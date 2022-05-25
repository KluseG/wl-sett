import {IModel} from '@interfaces//IModel';

/**
 * Generic Collection interface
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface ICollection<T extends IModel> {
    /**
     * Adds model to collection.
     *
     * @param model
     */
    add(model: T): ICollection<T>;

    /**
     * Returns the model at the given index.
     * Does not perform any checks.
     *
     * @param index
     */
    get(index: number): T;

    /**
     * Sorts the collection using specified model property and sort direction.
     *
     * @param property
     * @param direction
     */
    sortBy(property: keyof T, direction?: 'ASC' | 'DESC'): ICollection<T>;

    /**
     * Transforms collection to JSON string.
     */
    toJSON(): string;
}