import 'reflect-metadata';
import {StdOutOutputter} from '@output/StdOutOutputter';

const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation((str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined): boolean => true);

test('outputs to stdout', async () => {
    const outputter = new StdOutOutputter();

    await outputter.output('Hello world!');

    expect(mockStdout).toHaveBeenCalledWith('Hello world!\n');
});

test('doesn\'t fail on invalid input', async () => {
    const outputter = new StdOutOutputter();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await outputter.output({ some: 'data' });

    expect(mockStdout).toHaveBeenCalledWith('[object Object]\n');
});
