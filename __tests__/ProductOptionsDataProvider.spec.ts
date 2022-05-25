import {ProductOptionsDataProvider} from '@data-providers/ProductOptionsDataProvider';
import {ProductOptionCollection} from '@collections/ProductOptionCollection';

const getCollection = () => new ProductOptionCollection();

const getRepository = () => {
    return {
        async all() {
            return getCollection();
        }
    };
};

test('provides data as string', async () => {
    const dataProvider = new ProductOptionsDataProvider(getRepository());

    const result = await dataProvider.provideAsString();

    expect(result).toEqual('[]');
});