/**
 * Search criteria used by Data Contexts to filter and sort lists.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface ICriteria {
    /**
     * Adds field to select.
     *
     * @param fieldName
     */
    addField(fieldName: string): ICriteria
}