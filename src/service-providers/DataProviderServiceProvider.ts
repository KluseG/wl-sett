import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {TOKENS} from '@app/tokens';
import {IDataProvider} from '@interfaces/IDataProvider';
import {ProductOptionsDataProvider} from '@data-providers/ProductOptionsDataProvider';
import {IRepository} from '@interfaces/IRepository';
import {ProductOptionModel} from '@models/ProductOptionModel';

/**
 * Registers DataProvider..
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class DataProviderServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IDataProvider>(TOKENS.dataProvider).toDynamicValue((context: interfaces.Context) => {
            return new ProductOptionsDataProvider(context.container.get<IRepository<ProductOptionModel>>(TOKENS.repository));
        });
    }
}