import {ProductOptionModel} from '@models/ProductOptionModel';
import {EnumPriceType} from '@interfaces/EnumPriceType';

test('calculates proper annual price', () => {
   const annualModel = new ProductOptionModel('0', '0', '0', { value: 100, currency: 'UNKNOWN' }, EnumPriceType.PER_YEAR, null);
   const monthlyModel = new ProductOptionModel('0', '0', '0', { value: 100, currency: 'UNKNOWN' }, EnumPriceType.PER_MONTH, null);

   expect(annualModel.annualPriceValue).toEqual(100);
   expect(monthlyModel.annualPriceValue).toEqual(1200);
});

test('calculates proper discount value', () => {
   const annualModel = new ProductOptionModel('0', '0', '0', { value: 80, currency: 'UNKNOWN' }, EnumPriceType.PER_YEAR, { value: 20, currency: 'UNKNOWN' });
   const monthlyModel = new ProductOptionModel('0', '0', '0', { value: 150, currency: 'UNKNOWN' }, EnumPriceType.PER_MONTH, { value: 100, currency: 'UNKNOWN' });

   expect(annualModel.savingsPercent).toEqual(20);
   expect(monthlyModel.savingsPercent).toEqual(5.26);
});

test('converts to JSON', () => {
   const model = new ProductOptionModel('A', 'B', 'C', { value: 80, currency: 'UNKNOWN' }, EnumPriceType.PER_MONTH, { value: 20, currency: 'UNKNOWN' });

   expect(model.toJSON()).toEqual('{"option title":"A","description":"B","features":"C","price":"80 UNKNOWN","annual price":"960 UNKNOWN","discount":"20 UNKNOWN","savings":"2.04%"}');
});