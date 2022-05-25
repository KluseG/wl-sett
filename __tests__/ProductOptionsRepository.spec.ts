import {ProductOptionsRepository} from '@repositories/ProductOptionsRepository';
import {ICriteria} from '@interfaces/ICriteria';
import {IProductOption} from '@interfaces/IProductOption';
import {EnumPriceType} from '@interfaces/EnumPriceType';
import {ProductOptionModel} from '@models/ProductOptionModel';

const getDataProvider = (data: Array<IProductOption>) => {
    return {
        async list(criteria: ICriteria | null) {
            return Promise.resolve(data);
        }
    };
};

test('returns empty collection when no data is provided', async () => {
    const repo = new ProductOptionsRepository(getDataProvider([]));

    const collection = await repo.all();

    expect(collection.toJSON()).toEqual('[]');
    expect(collection.get(0)).toBeUndefined();
});

test('returns collection with the correct amount of models', async () => {
    const repo = new ProductOptionsRepository(getDataProvider([{
        description: 'DESCRIPTION', discount: {
            currency: 'USD', value: 1,
        }, name: 'NAME', price: {
            currency: 'USD', value: 1,
        }, price_type: EnumPriceType.PER_MONTH, title: 'TITLE'
    }]));

    const collection = await repo.all();

    expect(collection.get(0)).toEqual(new ProductOptionModel('TITLE', 'NAME', 'DESCRIPTION', {
        currency: 'USD', value: 1,
    }, EnumPriceType.PER_MONTH, {
        currency: 'USD', value: 1,
    }));
});