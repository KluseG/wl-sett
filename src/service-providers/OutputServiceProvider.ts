import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {TOKENS} from '@app/tokens';
import {IOutputter} from '@interfaces/IOutputter';
import {StdOutOutputter} from '@output/StdOutOutputter';

/**
 * Registers Outputter.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class OutputServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IOutputter>(TOKENS.outputter).to(StdOutOutputter);
    }
}