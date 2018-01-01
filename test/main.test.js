const fs = require('fs');
const path = require('path');

const func = require('../src/main');

const { JSDOM } = require('jsdom');
const { window } = new JSDOM(fs.readFileSync('./test/test.html'));
const { document } = window;

describe('', function () {
  test('test 1', function () {
    const domCollection = func('div', document.querySelectorAll('html'));
    expect(true).toBe(true);
  })
});