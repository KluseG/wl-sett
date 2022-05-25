import 'module-alias/register';
import 'reflect-metadata';

/**
 * Application entrypoint.
 *
 * @Author Adrian Kluska <adrian@kluska.co>
 * @Copyright Adrian Kluska 2022
 */

import {App} from '@app/app';

// Create App instance
const app = new App();

// Boot app
app.bootstrap();

// Output data and exit
app.output().then(() => {
    process.exit(0);
});