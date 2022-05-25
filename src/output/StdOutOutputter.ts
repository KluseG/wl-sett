import {IOutputter} from '@interfaces/IOutputter';
import {injectable} from 'inversify';

/**
 * Outputs data to stdout.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
@injectable()
export class StdOutOutputter implements IOutputter {
    /**
     * @inheritDoc
     */
    public output(data: string): Promise<void> {
        // Returning a promise gives us an option to
        // implement multiple outputters that may
        // use third-party services.
        return new Promise((resolve, reject) => {
            try {
                process.stdout.write(`${data}\n`);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}