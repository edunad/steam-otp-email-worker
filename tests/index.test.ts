import { beforeAll, describe, expect, it } from 'vitest';

import worker, { extractKey } from '../src/email';
import mock from './mock/test_mail.html?raw';

describe('Steam Code', () => {
    const stream: TransformStream = new TransformStream();
    let streamSize: number = 0;

    beforeAll(() => {
        const writer = stream.writable.getWriter();
        const encoded = new TextEncoder().encode(mock);
        streamSize = encoded.length;

        writer.write(encoded);
        writer.close();
    });

    it('should extract steam code from string', () => {
        expect(extractKey(mock)).toBe('4B2C4');
    });

    it('should reject non-steam emails', async () => {
        expect(
            (async () => {
                await worker.email(
                    {
                        from: 'mew@steampowered.com',
                        to: 'meep',
                        headers: new Headers(),
                        raw: stream.readable,
                        rawSize: streamSize,
                        setReject: () => {},
                        forward: (to) => Promise.resolve(),
                    },
                    {},
                    {
                        passThroughOnException: () => {},
                        waitUntil: () => {},
                    },
                );
            })(),
        ).rejects.toThrowError(`Invalid email 'mew@steampowered.com'`);
    });

    it('should reject non-steam emails', async () => {
        expect(
            (async () => {
                await worker.email(
                    {
                        from: 'mew@steampowered.com',
                        to: 'meep',
                        headers: new Headers(),
                        raw: stream.readable,
                        rawSize: streamSize,
                        setReject: () => {},
                        forward: (to) => Promise.resolve(),
                    },
                    {},
                    {
                        passThroughOnException: () => {},
                        waitUntil: () => {},
                    },
                );
            })(),
        ).rejects.toThrowError(`Invalid email 'mew@steampowered.com'`);
    });
});
