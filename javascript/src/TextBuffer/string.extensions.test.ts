import test from 'ava';
import './string.extensions';

test('removeCharAt removes the character at the specified index', t => {
    const str = 'hello';
    const newStr = str.removeCharAt(1);
    t.is(newStr, 'hllo');
});

test('insertCharAt inserts a character at the specified index', t => {
    const str = 'hello';
    const newStr = str.insertCharAt(1, 'a');
    t.is(newStr, 'haello');
});

test('insertCharAt appends the character if the index is greater than the string length', t => {
    const str = 'hello';
    const newStr = str.insertCharAt(5, 'a');
    t.is(newStr, 'helloa');
});

test('insertCharAt prepends the character if the index is 0', t => {
    const str = 'hello';
    const newStr = str.insertCharAt(0, 'a');
    t.is(newStr, 'ahello');
});

test('insertCharAt inserts the character at the end of the string if the index is negative', t => {
    const str = 'hello';
    const newStr = str.insertCharAt(-1, 'a');
    t.is(newStr, 'hellao');
});
