/**
 * Interface used for outputting data.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IOutputter {
    /**
     * Outputs provided data to implemented destination.
     *
     * @param data
     */
    output(data: string): Promise<void>;
}