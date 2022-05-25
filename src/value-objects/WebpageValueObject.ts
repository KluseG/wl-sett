import {JSDOM, VirtualConsole} from 'jsdom';
import {IWebpageValueObject} from '@interfaces/IWebpageValueObject';
import {IWebpageValueObjectQuery} from '@interfaces/IWebpageValueObjectQuery';
import {IWebpageValueObjectQueryResult} from '@interfaces/IWebpageValueObjectQueryResult';
import {IWebpageValueObjectQueryField} from '@interfaces/IWebpageValueObjectQueryField';
import {IWebpageValueObjectQueryResultData} from '@interfaces/IWebpageValueObjectQueryResultData';
import {EnumWebpageValueObjectQueryFieldType} from '@interfaces/EnumWebpageValueObjectQueryFieldType';

/**
 * Immutable object representing webpage content.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export class WebpageValueObject implements IWebpageValueObject {
    /**
     * Instance of DOM parser.
     *
     * @private
     */
    private readonly dom: JSDOM;

    /**
     * Creates WebpageValueObject instance.
     *
     * @param htmlString
     * @param baseUrl
     */
    constructor(private readonly htmlString: string, baseUrl: string) {
        this.dom = new JSDOM(htmlString, {
            url: baseUrl, referrer: baseUrl, virtualConsole: new VirtualConsole()
        });
    }

    /**
     * Get the DOM `document` object.
     *
     * @protected
     */
    protected get document(): Document {
        return this.dom.window.document;
    }

    /**
     * @inheritDoc
     */
    public getData<T extends IWebpageValueObjectQueryResultData>(query: IWebpageValueObjectQuery): IWebpageValueObjectQueryResult<T> {
        // The main entity a.k.a. table
        const rootElement = this.document.querySelectorAll(query.selector);
        if (!rootElement.length) {
            return this.composeQueryResult<T>(null);
        }

        const result: Array<T> = [];
        rootElement.forEach(parent => {
            // Every root element becomes a row a.k.a. table row
            const row: T = {} as T;

            // Loop through the fields a.k.a. columns
            query.fields.forEach(field => {
                // Find nodes matching field selector
                const fieldNodes = parent.querySelectorAll(field.selector);
                if (!fieldNodes.length) {
                    return;
                }

                // Get the values of the matched nodes
                this.resolveFieldNodes(field, fieldNodes, row);
            });

            result.push(row);
        });

        return this.composeQueryResult<T>(result);
    }

    /**
     * Create an object that satisfies IWebpageValueObjectQueryResult interface.
     *
     * @param result
     * @protected
     */
    protected composeQueryResult<T extends IWebpageValueObjectQueryResultData>(result: Array<T> | null): IWebpageValueObjectQueryResult<T> {
        if (result !== null && Object.keys(result).length === 0) {
            // Empty result is converted to `null`
            return {data: null};
        }

        return {data: result};
    }

    /**
     * Find matching values for given field.
     *
     * @param field
     * @param nodes
     * @param row
     * @protected
     */
    protected resolveFieldNodes(field: IWebpageValueObjectQueryField, nodes: NodeListOf<Element>, row: IWebpageValueObjectQueryResultData): void {
        // List of values
        const result: Array<string> = [];

        // Loop through matched nodes to collect multiple values, for example: product features
        // or gallery images
        nodes.forEach(node => {
            if (field.type === EnumWebpageValueObjectQueryFieldType.HTML) {
                // Return type was declared as HTML
                return result.push(node.innerHTML);
            }

            // Not every node has textContent
            if (node.textContent) {
                if (node.innerHTML.includes('<br>')) {
                    // Replace `<br>` with `, ` as line break has no use in this scenario
                    node.innerHTML = node.innerHTML.split('<br>').map(line => line.trim()).join(', ');
                }

                // Remove newlines and multiple spaces
                return result.push(node.textContent.replaceAll('\n', '').replaceAll('  ', '').trim());
            }
        });

        // Passing results through reference to gain some speed.
        if (!result.length) {
            // No results, key would be null
            row[field.identifier] = null;
        } else if (result.length === 1) {
            // Single result, no need for array
            row[field.identifier] = result[0];
        } else {
            // Multiple results
            row[field.identifier] = result;
        }
    }
}