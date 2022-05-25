import {IModel} from '@interfaces/IModel';
import {ICollection} from '@interfaces/ICollection';

/**
 * Generic repository interface.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IRepository<T extends IModel> {
    /**
     * Fetches all entities through DataContext.
     */
    all(): Promise<ICollection<T>>
}