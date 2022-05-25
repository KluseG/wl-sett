import {ICriteria} from '@interfaces/ICriteria';

/**
 * Generic DataContext interface
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IDataContext<T> {
    /**
     * Get a list of entities based on provider search criteria.
     *
     * @param criteria
     */
    list(criteria: ICriteria | null): Promise<Array<T>>
}