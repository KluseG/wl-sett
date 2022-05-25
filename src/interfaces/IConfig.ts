import {IServiceProvider} from '@interfaces/IServiceProvider';

/**
 * Application config interface.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IConfig {
    /**
     * List of service providers that need to be registered.
     */
    serviceProviders: Array<{ new(): IServiceProvider }>
}