import test from 'ava';
import './array.extensions';

test('getMaxChar', t => {
    const arr1 = ['one', 'two', 'three', 'four'];
    const arr2 = ['a', 'ab', 'abc', 'abcd'];
    const arr3 = ['', ' ', '  '];
    const arr4 = [];

    t.is(arr1.getMaxChar(), 5);
    t.is(arr2.getMaxChar(), 4);
    t.is(arr3.getMaxChar(), 2);
    t.is(arr4.getMaxChar(), 0);
});