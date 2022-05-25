/**
 * Simple map of Injection tokens.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */
export const TOKENS = {
    http: Symbol.for('http'),
    webpageProvider: Symbol.for('webpageProvider'),
    dataContext: Symbol.for('dataContext'),
    repository: Symbol.for('repository'),
    dataProvider: Symbol.for('dataProvider'),
    outputter: Symbol.for('outputter')
};