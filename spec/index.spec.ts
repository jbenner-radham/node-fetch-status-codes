import fetchStatusCodes, { fetchStatusCodeClasses } from '../src/index.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const fixturePath = path.join(dirname, 'fixture.html');
const fixture = fs.readFileSync(fixturePath, 'utf-8');

describe('fetchStatusCodes', () => {
  beforeAll(() => {
    vi.stubGlobal('fetch', () => ({ text: async () => fixture }));
  });

  afterAll(() => {
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

describe('fetchStatusCodeClasses', () => {
  beforeAll(() => {
    vi.stubGlobal('fetch', () => ({ text: async () => fixture }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('is a function', () => {
    expect(fetchStatusCodeClasses).toBeTypeOf('function');
  });

  it('it returns an array containing the 1xx status code class', async () => {
    const statusCodeClasses = await fetchStatusCodeClasses();

    expect(statusCodeClasses.at(0)).toEqual({
      value: '1xx',
      name: 'Informational',
      description: 'Request received, continuing process'
    });
  });

  it('it returns an array containing the 5xx status code class', async () => {
    const statusCodeClasses = await fetchStatusCodeClasses();

    expect(statusCodeClasses.at(-1)).toEqual({
      value: '5xx',
      name: 'Server Error',
      description: 'The server failed to fulfill an apparently valid request'
    });
  });
});
