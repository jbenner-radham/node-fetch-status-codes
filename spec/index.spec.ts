import fetchStatusCodes from '../src/index.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('fetchStatusCodes', () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const fixturePath = path.join(dirname, 'fixture.html');
  const fixture = fs.readFileSync(fixturePath, 'utf-8');

  beforeEach(() => {
    vi.stubGlobal('fetch', () => ({ text: async () => fixture }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('is a function', () => {
    expect(fetchStatusCodes).toBeTypeOf('function');
  });

  it('it returns an array containing the status code 100', async () => {
    const statusCodes = await fetchStatusCodes();

    expect(statusCodes.at(0)!.value).toEqual(100);
  });

  it('it returns an array containing the status code 511', async () => {
    const statusCodes = await fetchStatusCodes();

    expect(statusCodes.at(-1)!.value).toEqual(511);
  });
});
