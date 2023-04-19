import test from 'ava';
import { SingleLineOutputFormatter } from './SingleLineOutputFormatter';

test('SingleLineOutputFormatter - format() returns a single line string array', t => {
    const singleLineOutputFormatter = new SingleLineOutputFormatter();
    const inputArray = ['hello', 'world'];
    const expectedOutput = ['hello world'];

    const result = singleLineOutputFormatter.format(inputArray);

    t.deepEqual(result, expectedOutput);
});