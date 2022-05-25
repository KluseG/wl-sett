import {WebpageValueObject} from '../src/value-objects/WebpageValueObject';
import {EnumWebpageValueObjectQueryFieldType} from '../src/interfaces/EnumWebpageValueObjectQueryFieldType';


const getValueObject = () => {
    const html = `
        <html>
            <body>
                <div class="product">
                    <div class="product-name"><span>Lipstick 1</span></div>
                    <div class="product-features">Red<br>Long     <br>    \n Matte <br> Black case </div>
                    <div class="product-image">http://server.com/lipstick-1/images/0.png</div>
                    <div class="product-image">http://server.com/lipstick-1/images/1.png</div>
                </div>
                <div class="product">
                    <div class="product-name"><span>Lipstick 2</span></div>
                    <div class="product-features"> Green<br>Short     <br>    \n Glossy <br> Ocean case </div>
                    <div class="product-image">http://server.com/lipstick-2/images/0.png</div>
                    <div class="product-image">http://server.com/lipstick-2/images/1.png</div>
                    <div class="product-image">http://server.com/lipstick-2/images/2.png</div>
                </div>
            </body>
        </html>
    `;

    return new WebpageValueObject(html, 'https://example.com');
};

test('queries simple document', () => {
    const vo = getValueObject();

    const result = vo.getData({
        selector: '.product',
        fields: []
    });

    expect(result).toEqual({data: [{}, {}]});
});

test('queries fields as HTML', () => {
    const vo = getValueObject();

    const result = vo.getData<{
        name: string,
        features: string,
        images: Array<string>
    }>({
        selector: '.product',
        fields: [
            {
                selector: '.product-name',
                identifier: 'name',
                type: EnumWebpageValueObjectQueryFieldType.HTML
            },
            {
                selector: '.product-features',
                identifier: 'features',
                type: EnumWebpageValueObjectQueryFieldType.HTML
            },
            {
                selector: '.product-image',
                identifier: 'images',
                type: EnumWebpageValueObjectQueryFieldType.HTML
            }
        ]
    });


    expect(result).toEqual({
        data: [
            {
                name: '<span>Lipstick 1</span>',
                features: 'Red<br>Long     <br>    \n Matte <br> Black case ',
                images: [
                    'http://server.com/lipstick-1/images/0.png',
                    'http://server.com/lipstick-1/images/1.png'
                ]
            },
            {
                name: '<span>Lipstick 2</span>',
                features: ' Green<br>Short     <br>    \n Glossy <br> Ocean case ',
                images: [
                    'http://server.com/lipstick-2/images/0.png',
                    'http://server.com/lipstick-2/images/1.png',
                    'http://server.com/lipstick-2/images/2.png'
                ]
            }
        ]
    });
});

test('queries fields as text', () => {
    const vo = getValueObject();

    const result = vo.getData({
        selector: '.product',
        fields: [
            {
                selector: '.product-name',
                identifier: 'name',
                type: EnumWebpageValueObjectQueryFieldType.TEXT
            },
            {
                selector: '.product-image',
                identifier: 'images',
                type: EnumWebpageValueObjectQueryFieldType.TEXT
            }
        ]
    });

    expect(result).toEqual({
        data: [{
            name: 'Lipstick 1', images: [
                'http://server.com/lipstick-1/images/0.png',
                'http://server.com/lipstick-1/images/1.png'
            ]
        }, {
            name: 'Lipstick 2', images: [
                'http://server.com/lipstick-2/images/0.png',
                'http://server.com/lipstick-2/images/1.png',
                'http://server.com/lipstick-2/images/2.png'
            ]
        }
        ]
    });
});

test('converts newlines to commas', () => {
    const vo = getValueObject();

    const result = vo.getData({
        selector: '.product',
        fields: [
            {
                selector: '.product-features',
                identifier: 'features',
                type: EnumWebpageValueObjectQueryFieldType.TEXT
            },
        ]
    });

    expect(result).toEqual({
            data: [
                {features: 'Red, Long, Matte, Black case'},
                {features: 'Green, Short, Glossy, Ocean case'}
            ]
        }
    );
});