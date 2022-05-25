import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {TOKENS} from '@app/tokens';
import {WebpageProductOptionsDataContext} from '@data-contexts/WebpageProductOptionsDataContext';
import {IDataContext} from '@interfaces/IDataContext';
import {IProductOption} from '@interfaces/IProductOption';
import {IHttp} from '@interfaces/IHttp';
import {IWebpageProvider} from '@interfaces/IWebpageProvider';

/**
 * Registers DataContext.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class DataContextServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IDataContext<IProductOption>>(TOKENS.dataContext).toDynamicValue((context: interfaces.Context) => {
            return new WebpageProductOptionsDataContext(
                context.container.get<IHttp>(TOKENS.http),
                context.container.get<IWebpageProvider>(TOKENS.webpageProvider)
            );
        });
    }
}