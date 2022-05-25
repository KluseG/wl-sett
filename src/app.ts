import {IOutputter} from '@interfaces/IOutputter';
import {OutputterNotProvidedError} from '@errors/OutputterNotProvidedError';
import {Container, interfaces} from 'inversify';
import {config} from '@app/config';
import {IServiceProvider} from '@interfaces/IServiceProvider';
import {TOKENS} from '@app/tokens';
import {IDataProvider} from '@interfaces/IDataProvider';
import {DataProviderNotProvidedError} from '@errors/DataProviderNotProvidedError';

/**
 * Main class.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class App {
    /**
     * IoC container instance.
     *
     * @private
     */
    private readonly container: interfaces.Container;

    /**
     * List of Service Providers.
     *
     * @private
     */
    private readonly serviceProviders: Array<IServiceProvider> = [];

    /**
     * Creates the App instance.
     */
    constructor() {
        this.container = new Container();
    }

    /**
     * Bootstrap the application.
     */
    public bootstrap() {
        // Read and store service providers.
        config.serviceProviders.forEach((ctor) => {
            this.serviceProviders.push(new ctor());
        });

        // Register all service providers.
        this.serviceProviders.forEach(provider => provider.register(this.container));
    }

    /**
     * Outputs data from DataProvider.
     */
    public async output(): Promise<void> {
        // Get outputter
        const outputter = this.container.get<IOutputter>(TOKENS.outputter);
        if (!outputter) {
            throw new OutputterNotProvidedError();
        }

        // Get data provider
        const dataProvider = this.container.get<IDataProvider>(TOKENS.dataProvider);
        if (!dataProvider) {
            throw new DataProviderNotProvidedError();
        }

        // Load data from data provider
        const data = await dataProvider.provideAsString();

        // Output data
        await outputter.output(data);
    }
}