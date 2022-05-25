import 'reflect-metadata';
import {Container} from 'inversify';
import {config} from '@app/config';
import {IHttp} from '@interfaces/IHttp';
import {TOKENS} from '@app/tokens';
import {IWebpageProvider} from '@interfaces/IWebpageProvider';
import {IDataContext} from '@interfaces/IDataContext';
import {IRepository} from '@interfaces/IRepository';
import {IModel} from '@interfaces/IModel';
import {IDataProvider} from '@interfaces/IDataProvider';
import {IOutputter} from '@interfaces/IOutputter';


test('registers correct services', () => {
    const container = new Container();

    for (const serviceProviderConstructor of config.serviceProviders) {
        const serviceProvider = new serviceProviderConstructor();

        serviceProvider.register(container);
    }

    // IHttp
    expect(container.get<IHttp>(TOKENS.http).get).toBeInstanceOf(Function);

    // IWebpageProvider
    expect(typeof container.get<IWebpageProvider>(TOKENS.webpageProvider).webpageUrl).toEqual('string');
    expect(container.get<IWebpageProvider>(TOKENS.webpageProvider).createValueObject).toBeInstanceOf(Function);

    // IDataContext
    expect(container.get<IDataContext<unknown>>(TOKENS.dataContext).list).toBeInstanceOf(Function);

    // IRepository
    expect(container.get<IRepository<IModel>>(TOKENS.repository).all).toBeInstanceOf(Function);

    // IDataProvider
    expect(container.get<IDataProvider>(TOKENS.dataProvider).provideAsString).toBeInstanceOf(Function);

    // IOutputter
    expect(container.get<IOutputter>(TOKENS.outputter).output).toBeInstanceOf(Function);
});