import test from 'ava';
import { Cursor, CursorPosition } from './Cursor';

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

test('cannot decrement char below -1', t => {
    const cursor = new Cursor();
    cursor.decrementChar();
    t.is(cursor.char(), -1);
});

test('increment line', (t) => {
    const cursor = new Cursor();
    const ival = cursor.incrementLine();
    const expected = { line: 1, char: 0 };
    const actual = cursor.position();
    t.deepEqual(actual, expected);
    t.is(ival, 1)
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
    t.is(cursor.line(), 0);
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

test('cursor mutation', t => {

    const cursor = new Cursor();
    cursor.setLine(1);
    cursor.setChar(10);

    const l1 = cursor.position();
    const line1 = cursor.line();
    const char1 = cursor.char();
    t.is(l1.line, 1)
    t.is(l1.char, 10)
    t.is(line1, 1)
    t.is(char1, 10)

    cursor.setLine(5);
    cursor.setChar(99);
    const l2 = cursor.position();
    t.is(l2.line, 5)
    t.is(l2.char, 99)
    t.is(l1.line, 1)
    t.is(l1.char, 10)
    t.is(line1, 1)
    t.is(char1, 10)

});