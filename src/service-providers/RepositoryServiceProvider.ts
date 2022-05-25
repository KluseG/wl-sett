import {IServiceProvider} from '@interfaces/IServiceProvider';
import {interfaces} from 'inversify';
import {TOKENS} from '@app/tokens';
import {IRepository} from '@interfaces/IRepository';
import {ProductOptionModel} from '@models/ProductOptionModel';
import {ProductOptionsRepository} from '@repositories/ProductOptionsRepository';
import {IDataContext} from '@interfaces/IDataContext';
import {IProductOption} from '@interfaces/IProductOption';

/**
 * Registers Repository.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class RepositoryServiceProvider implements IServiceProvider {
    /**
     * @inheritDoc
     */
    public register(container: interfaces.Container): void {
        container.bind<IRepository<ProductOptionModel>>(TOKENS.repository).toDynamicValue((context: interfaces.Context) => {
            return new ProductOptionsRepository(context.container.get<IDataContext<IProductOption>>(TOKENS.dataContext));
        });
    }
}