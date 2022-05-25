import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {IHttp} from '@interfaces/IHttp';
import {TOKENS} from '@app/tokens';
import {FetchHttpService} from '@http/FetchHttpService';

/**
 * Registers Http.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class HttpServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IHttp>(TOKENS.http).to(FetchHttpService);
    }
}