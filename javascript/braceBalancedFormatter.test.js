const test = require('ava');
const bb = require("./braceBalancedFormatter.js");


test('simple balanced braces', t => {
    t.is(bb.isBalanced("cmd(x)"), true);
    t.is(bb.isBalanced("cmd[x]"), true);
    t.is(bb.isBalanced("cmd{x}"), true);
});

test('complex balanced braces', t => {
    t.is(bb.isBalanced("save(seq(cmd(x) cmd(y) cmd(a b c) cmd (45 67 93)))"), true);
    t.is(bb.isBalanced("cmd{([x])}"), true);
    t.is(bb.isBalanced("cmd{{{(({[x]}))}}}"), true);
});

test('simple unbalanced braces', t => {
    t.is(bb.isBalanced("cmd(x"), false);
    t.is(bb.isBalanced("cmd{x"), false);
    t.is(bb.isBalanced("cmd[x"), false);
    t.is(bb.isBalanced("cmd)"), false);
    t.is(bb.isBalanced("cmd}"), false);
    t.is(bb.isBalanced("cmd]"), false);
});

test('complex unbalanced braces', t => {
    t.is(bb.isBalanced("save(seq(cmd(x) cmd(y) cmd(a b c cmd (45 67 93)))"), false);
    t.is(bb.isBalanced("save(seq(cmd(x) cmd(y) cmd(a b c) cmd (45 67 93))"), false);
    t.is(bb.isBalanced("cmd{([x]}"), false);
    t.is(bb.isBalanced("cmd{{{({[x]}))}}}"), false);
});

test('multiline balanced brace formatting', t => {
    let res = bb.format(["seq(cmd(100) cmd(666)", "cmd(200)", "cmd(300))", "cmd(300)"])
    t.deepEqual(res, ["seq(cmd(100) cmd(666) cmd(200) cmd(300))", "cmd(300)"]);
});

test('multiline last line unbalanced brace formatting', t => {
    let res = bb.format(["seq(cmd(100) cmd(666)", "cmd(200)", "cmd(300))", "cmd(300"])
    t.deepEqual(res, ["seq(cmd(100) cmd(666) cmd(200) cmd(300))"]);
});

test('multiline unbalanced brace formatting', t => {
    let res = bb.format(["seq(cmd(100) cmd(666)", "cmd(200)", "cmd(300)", "cmd(300)"])
    t.deepEqual(res, []);
});

test('strict balanced pass', t => {
    t.notThrows(() => {bb.format(["cmd(200)"],true)});
});

test('strict unbalanced exception', t => {
    const error = t.throws(() => {
		bb.format(["cmd(200"],true)
	}, {instanceOf: Error});

	t.is(error.message, 'not balanced: cmd(200');
});


test('incorrect space insertion', t => {
    t.deepEqual(bb.format(["seq(cmd(100)",")"]), ["seq(cmd(100))"])
});


test('incorrect space insertion at line start after break', t => {
    t.deepEqual(bb.format(["seq(cmd(", "100)", ")" ]),["seq(cmd(100))"])
});