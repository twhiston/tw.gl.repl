import test from 'ava';
import { WhitespaceFormatter } from './WhitespaceFormatter';

test('WhitespaceFormatter should format strings correctly', t => {
    const formatter = new WhitespaceFormatter();
    const input = ['  hello   world  ', '  foo  bar ', 'baz  '];
    const expectedOutput = ['hello world', 'foo bar', 'baz'];
    const actualOutput = formatter.format(input);
    t.deepEqual(actualOutput, expectedOutput);
});