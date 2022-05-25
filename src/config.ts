import {HttpServiceProvider} from '@app/service-providers/HttpServiceProvider';
import {IConfig} from '@interfaces/IConfig';
import {WebpageProviderServiceProvider} from '@app/service-providers/WebpageProviderServiceProvider';
import {DataContextServiceProvider} from '@app/service-providers/DataContextServiceProvider';
import {RepositoryServiceProvider} from '@app/service-providers/RepositoryServiceProvider';
import {DataProviderServiceProvider} from '@app/service-providers/DataProviderServiceProvider';
import {OutputServiceProvider} from '@app/service-providers/OutputServiceProvider';

/**
 * App config.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export const config: IConfig = {
    /**
     * @inheritDoc
     */
    serviceProviders: [DataContextServiceProvider, DataProviderServiceProvider, HttpServiceProvider, OutputServiceProvider, RepositoryServiceProvider, WebpageProviderServiceProvider]
};