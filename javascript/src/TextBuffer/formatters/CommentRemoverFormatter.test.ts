import test from 'ava';
import { CommentRemoverFormatter } from './CommentRemoverFormatter';

test('CommentRemoverFormatter filters out commented lines', t => {
    const formatter = new CommentRemoverFormatter();
    const input = ['// this is a comment', 'this is not', '//another comment', 'still not a comment'];
    const expected = ['this is not', 'still not a comment'];
    const output = formatter.format(input);
    t.deepEqual(output, expected);
});

test('CommentRemoverFormatter.id is "commentremover"', t => {
    const formatter = new CommentRemoverFormatter();
    t.true(formatter.id === 'commentremover');
});

test('CommentRemoverFormatter filters nothing if no comments present', t => {
    const formatter = new CommentRemoverFormatter();
    const input = ['this is not a comment', 'still not a comment'];
    const expected = ['this is not a comment', 'still not a comment'];
    const output = formatter.format(input);
    t.deepEqual(output, expected);
});

test('CommentRemoverFormatter if only comment', t => {
    const formatter = new CommentRemoverFormatter();
    const input = ['//this is  a comment'];
    const expected = [];
    const output = formatter.format(input);
    t.deepEqual(output, expected);
});