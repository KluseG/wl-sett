import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {IWebpageProvider} from '@interfaces/IWebpageProvider';
import {TOKENS} from '@app/tokens';
import {WLTestWebpageProvider} from '@webpage-providers/WLTestWebpageProvider';

/**
 * Registers WebpageProvider.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class WebpageProviderServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IWebpageProvider>(TOKENS.webpageProvider).to(WLTestWebpageProvider);
    }
}