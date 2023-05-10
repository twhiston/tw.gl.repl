import test from 'ava';
import { createObjectAssignPolyfill } from './object.extensions';
test('Object.assign polyfill', t => {

    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    createObjectAssignPolyfill();
    const result = Object.assign({}, obj1, obj2, obj3);
    t.deepEqual(result, { a: 1, b: 2, c: 3 });
});

test('Object.assign polyfill with undefined/null values', t => {

    const obj1 = { a: 1 };
    const obj2 = undefined;
    const obj3 = null;
    const obj4 = { b: 2 };

    createObjectAssignPolyfill();
    const result = Object.assign({}, obj1, obj2, obj3, obj4);

    t.deepEqual(result, { a: 1, b: 2 });
});

test('Object.assign polyfill with empty objects', t => {

    const obj1 = {};
    const obj2 = {};
    const obj3 = { a: 1, b: 2 };

    createObjectAssignPolyfill();
    const result = Object.assign(obj1, obj2, obj3);

    t.deepEqual(result, { a: 1, b: 2 });
});
