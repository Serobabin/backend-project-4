import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import nock from 'nock';
import { expect, test } from '@jest/globals';
import pageLoader from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const testPage = 'http://www.example.com';
let expected;
let dirPath;

beforeEach(async () => {
  dirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  expected = await fs.readFile(getFixturePath('test.html'), 'utf-8');
});

test('page load', async () => {
  nock(testPage)
    .get('/')
    .reply(200, expected);

  const filePath = await pageLoader(testPage, dirPath);
  const actual = await fs.readFile(filePath, 'utf-8');
  expect(actual).toEqual(expected);
});
