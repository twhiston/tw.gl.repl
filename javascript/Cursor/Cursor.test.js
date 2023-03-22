const test = require('ava');
const Cursor = require('./Cursor');

test('initial position', (t) => {
    const cursor = new Cursor();
    const expected = { line: 0, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('increment char', (t) => {
    const cursor = new Cursor();
    cursor.incrementChar();
    const expected = { line: 0, char: 1 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('decrement char', (t) => {
    const cursor = new Cursor();
    cursor.incrementChar();
    cursor.decrementChar();
    const expected = { line: 0, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('cannot decrement char below 0', t => {
    const cursor = new Cursor();
    cursor.decrementChar();
    t.is(cursor.char(), 0);
});

test('increment line', (t) => {
    const cursor = new Cursor();
    cursor.incrementLine();
    const expected = { line: 1, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('set char', (t) => {
    const cursor = new Cursor();
    cursor.setChar(10);
    const expected = { line: 0, char: 10 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('set line', (t) => {
    const cursor = new Cursor();
    cursor.setLine(5);
    const expected = { line: 5, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('reset', (t) => {
    const cursor = new Cursor();
    cursor.setChar(10);
    cursor.setLine(5);
    cursor.reset();
    const expected = { line: 0, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);

    cursor.incrementChar();
    cursor.incrementChar();
    cursor.incrementLine();
    cursor.incrementLine();
    cursor.incrementLine();
    cursor.reset();
    const actual2 = cursor.position();
    t.deepEqual(actual2, expected);
});

test('reset char', (t) => {
    const cursor = new Cursor();
    cursor.setChar(10);
    cursor.resetChar();
    const expected = { line: 0, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
});

test('reset line', t => {
    const cursor = new Cursor();
    cursor.incrementLine();
    cursor.resetLine();
    t.is(cursor.curLine, 0);
});

test('Position returns object with current line and char values', t => {
    const cursor = new Cursor();
    const position = cursor.position();
    t.deepEqual(position, { line: 0, char: 0 });
});

test('Line returns the current line value', t => {
    const cursor = new Cursor();
    cursor.incrementLine();
    t.is(cursor.line(), 1);
});

test('Char returns the current char value', t => {
    const cursor = new Cursor();
    cursor.incrementChar();
    t.is(cursor.char(), 1);
});

test('decrementLine method should reduce curLine by 1', t => {
    const cursor = new Cursor();
    cursor.incrementLine();
    cursor.decrementLine();
    t.is(cursor.line(), 0);
});

test('decrementLine method should not reduce curLine below 0', t => {
    const cursor = new Cursor();
    cursor.decrementLine();
    t.is(cursor.line(), 0);
    cursor.incrementLine();
    cursor.decrementLine();
    cursor.decrementLine();
    t.is(cursor.line(), 0);
});