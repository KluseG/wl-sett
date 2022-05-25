import {interfaces} from 'inversify';

/**
 * Generic ServiceProvider interface.
 * Binds specific service to the Container.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export interface IServiceProvider {
    /**
     * Register service provider.
     *
     * @param container
     */
    register(container: interfaces.Container): void;
}