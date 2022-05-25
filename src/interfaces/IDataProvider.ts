/**
 * Generic DataProvider interface.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IDataProvider {
    /**
     * Executes the steps necessary to obtain client-ready data,
     * and returns the data in string format.
     */
    provideAsString(): Promise<string>;
}