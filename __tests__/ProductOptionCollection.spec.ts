import {ProductOptionCollection} from '@collections/ProductOptionCollection';
import {ProductOptionModel} from '@models/ProductOptionModel';
import {EnumPriceType} from '@interfaces/EnumPriceType';

const prepareCollection = (itemsNumber: number) => {
    const models = [];
    for (let i = 0; i < itemsNumber; i++) {
        models.push(
            new ProductOptionModel(i.toString(), i.toString(), i.toString(), { value: i, currency: 'UNKNOWN' }, EnumPriceType.PER_YEAR, null),
        );
    }

    return new ProductOptionCollection(models);
};

test('sorting by property ASCENDING', () => {
    const collection = prepareCollection(4);

    collection.sortBy('annualPriceValue', 'ASC');

    expect(collection.get(0).annualPriceValue).toEqual(0);
    expect(collection.get(1).annualPriceValue).toEqual(1);
    expect(collection.get(2).annualPriceValue).toEqual(2);
    expect(collection.get(3).annualPriceValue).toEqual(3);
});

test('sorting by property DESCENDING', () => {
    const collection = prepareCollection(4);

    collection.sortBy('annualPriceValue', 'DESC');

    expect(collection.get(0).annualPriceValue).toEqual(3);
    expect(collection.get(1).annualPriceValue).toEqual(2);
    expect(collection.get(2).annualPriceValue).toEqual(1);
    expect(collection.get(3).annualPriceValue).toEqual(0);
});

test('JSON generation', () => {
    const collection = prepareCollection(1);

    expect(collection.toJSON()).toEqual(`[${collection.get(0).toJSON()}]`);
});