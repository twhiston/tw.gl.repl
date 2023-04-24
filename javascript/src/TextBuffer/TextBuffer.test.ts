import test from 'ava';
import { TextBuffer } from './TextBuffer';
import { TextFormatter } from './TextFormatter';
import './array.extensions';

class TestWhiteSpaceTrimFormatter implements TextFormatter {
    id = "TestWhiteSpaceTrimFormatter"
    format(strArr: Array<string>, ctx: {}): Array<string> {
        // Your implementation goes here
        return strArr.map(str => str.trim()); // Example implementation that returns all strings in uppercase
    }
}

class TestWhiteSpaceReplacerFormatter implements TextFormatter {
    id = "TestWhiteSpaceReplacerFormatter"
    format(strArr: Array<string>, ctx: {}): Array<string> {
        // Your implementation goes here
        return strArr.map(str => str.replace(/\{/g, '').replace(/\}/g, '').trim()); // Example implementation that returns all strings in uppercase
    }
}

class TestUppercaseFormatter implements TextFormatter {
    id = "TestUppercaseFormatter"
    format(strArr: Array<string>, ctx: {}): Array<string> {
        // Your implementation goes here
        return strArr.map(str => str.toUpperCase()); // Example implementation that returns all strings in uppercase
    }
}

class TestBoldFormatter implements TextFormatter {
    id = "TestBoldFormatter"
    format(strArr: Array<string>, ctx: { author: string }): Array<string> {
        return strArr.map(str => {
            const boldPattern = /{bold}/g;
            const closeBoldPattern = /{\/bold}/g;
            const authorPattern = /{author}/g;
            const replacedText = str.replace(boldPattern, '<b>').replace(closeBoldPattern, '</b>').replace(authorPattern, ctx.author);
            return replacedText
        });
    }
}

test('TextBuffer initializes with empty array and maxLines', t => {
    const tb = new TextBuffer(10);
    t.deepEqual(tb.get(), ['']);
    t.is(tb.maxLines, 10);
});

test('set sets the buffer to the input string', t => {
    const tb = new TextBuffer(10);
    tb.set(['Hello world!']);
    t.deepEqual(tb.get(), ['Hello world!']);
});

test('setLine sets a specific line in the buffer to the input string', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.setLine(0, 'New Line 1');
    t.deepEqual(tb.get(), ['New Line 1', 'Line 2']);
});

test('append adds the input string to the end of the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.append(['Line 3']);
    t.deepEqual(tb.get(), ['Line 1', 'Line 2', 'Line 3']);
});

test('prepend adds the input string to the beginning of the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.prepend(['New Line 1']);
    t.deepEqual(tb.get(), ['New Line 1', 'Line 1', 'Line 2']);
});

test('emptyLine sets a specific line in the buffer to an empty string', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.emptyLine(0);
    t.deepEqual(tb.get(), ['', 'Line 2']);
});

test('lineLength returns the length of a specific line in the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    t.is(tb.lineLength(0), 6);
});

test('format applies all registered formatters to the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['  Line 1  ', ' { Line 2 } ']);
    tb.addFormatter(new TestWhiteSpaceTrimFormatter);
    tb.addFormatter(new TestWhiteSpaceReplacerFormatter);
    const formatted = tb.format();
    t.deepEqual(formatted, ['Line 1', 'Line 2']);
});

test('TextBuffer.formatLine applies formatter to a specific line', t => {

    class TestFormatter implements TextFormatter {
        id: string
        constructor(id: string) {
            this.id = id
        }

        format(source: string[]): string[] {
            return source.map(line => line.toUpperCase());
        }
    }

    const textBuffer = new TextBuffer(10);
    const testFormatter = new TestFormatter('test-formatter');

    textBuffer.set(['first line', 'second line']);
    textBuffer.addFormatter(testFormatter);

    const expectedResult = ['SECOND LINE'];
    const actualResult = textBuffer.formatLine(1);

    t.deepEqual(actualResult, expectedResult);
});

test('insertCharAt inserts a character into a specific position in a line', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.insertCharAt(0, 3, '!');
    t.deepEqual(tb.get(), ['Lin!e 1', 'Line 2']);
});

test('removeCharAt removes a character from a specific position in a line', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.removeCharAt(0, 3);
    t.deepEqual(tb.get(), ['Lin 1', 'Line 2']);
});

test('spliceLine does not create negative indices when splcing on 0', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.spliceLine(0);
    const arr = tb.get()
    const val = arr[-1]; // accessing negative index
    let undef = false;
    if (val !== undefined) {
        undef = true
    }
    t.is(false, undef, 'negative index exists')

});

test('spliceLine splice a specific line from the buffer into the previous', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2']);
    tb.spliceLine(0);
    t.deepEqual(tb.get(), ['Line 2']);
});

test('spliceLine should splice a line from text buffer into the previous', t => {
    const tb = new TextBuffer(5);
    tb.set(['line1', 'line2', 'line3']);
    tb.spliceLine(1);
    t.deepEqual(tb.get(), ['line1line2', 'line3']);
});

test('deleteLine should remove a line from text buffer', t => {
    const tb = new TextBuffer(5);
    tb.set(['line1', 'line2', 'line3']);
    tb.deleteLine(1);
    t.deepEqual(tb.get(), ['line1', 'line3']);
});

test('insertCharAt should insert a character at a specific index in a line', t => {
    const tb = new TextBuffer(5);
    tb.set(['line1', 'line2', 'line3']);
    tb.insertCharAt(1, 1, 'x');
    t.deepEqual(tb.get(), ['line1', 'lxine2', 'line3']);
});

test('removeCharAt should remove a character at a specific index in a line', t => {
    const tb = new TextBuffer(5);
    tb.set(['line1', 'line2', 'line3']);
    tb.removeCharAt(2, 1);
    t.deepEqual(tb.get(), ['line1', 'line2', 'lne3']);
});

//////////////////////

test('set sets the text buffer to the given array of strings', t => {
    const tb = new TextBuffer(10);
    const input = ['line 1', 'line 2', 'line 3'];
    tb.set(input);
    t.deepEqual(tb.get(), input);
});

test('set sets the text buffer to an array containing the given string if a string is provided', t => {
    const tb = new TextBuffer(10);
    const input = ['line 1'];
    tb.set(input);
    t.deepEqual(tb.get(), input);
});

test('setLine sets the given line to the given string', t => {
    const tb = new TextBuffer(10);
    tb.set(['line 1', 'line 2', 'line 3']);
    const input = 'new line';
    tb.setLine(1, input);
    t.is(tb.getLine(1), input);
});

test('append appends an array of strings to the text buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['line 1', 'line 2']);
    const input = ['line 3', 'line 4'];
    tb.append(input);
    t.deepEqual(tb.get(), ['line 1', 'line 2', 'line 3', 'line 4']);
});

test('append logs an error message and does not append if the maximum number of lines is reached', t => {
    const tb = new TextBuffer(2);
    tb.set(['line 1', 'line 2']);
    const input = ['line 3', 'line 4'];
    const consoleLog = console.log;
    console.log = () => { };
    tb.append(input);
    t.deepEqual(tb.get(), ['line 1', 'line 2']);
    console.log = consoleLog;
});

test('prepend prepends an array of strings to the text buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['line 3', 'line 4']);
    const input = ['line 1', 'line 2'];
    tb.prepend(input);
    t.deepEqual(tb.get(), ['line 1', 'line 2', 'line 3', 'line 4']);
});

test('prepend logs an error message and does not prepend if the maximum number of lines is reached', t => {
    const tb = new TextBuffer(2);
    tb.set(['line 1', 'line 2']);
    const input = ['line 3', 'line 4'];
    const consoleLog = console.log;
    console.log = () => { };
    tb.prepend(input);
    t.deepEqual(tb.get(), ['line 1', 'line 2']);
    console.log = consoleLog;
});

test('deleteLine removes the given line from the text buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['line 1', 'line 2', 'line 3']);
    tb.deleteLine(1);
    t.deepEqual(tb.get(), ['line 1', 'line 3']);
});

test('clear() removes all lines from the buffer and sets the first line to an empty string', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2', 'Line 3']);
    tb.clear();
    t.deepEqual(tb.get(), ['']);
});

test('setFormatters sets the formatters array', t => {
    const tb = new TextBuffer(10);
    tb.addFormatter(new TestWhiteSpaceTrimFormatter);
    tb.addFormatter(new TestWhiteSpaceReplacerFormatter);

    const formatter1 = new TestUppercaseFormatter
    const formatter2 = new TestUppercaseFormatter
    const formatters = [formatter1, formatter2];

    tb.setFormatters(formatters);
    t.deepEqual(tb.formatters, formatters);
});

test('lines returns the number of lines in the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2', 'Line 3']);
    t.is(tb.lines(), 3);
});

test('length returns the number of lines in the buffer', t => {
    const tb = new TextBuffer(10);
    tb.set(['Line 1', 'Line 2', 'Line 3']);
    t.is(tb.length(), 3);
});

test('pasteBinCopyLine should return the line specified in pasteBin', t => {
    const buffer = new TextBuffer(10);
    buffer.set(['Line 1', 'Line 2', 'Line 3']);

    const pasteBinLine = 1;
    const result = buffer.pasteBinCopyLine(pasteBinLine);

    t.deepEqual(result, ['Line 2']);
});

test('pasteBinCopyLine should throw an error if line index is out of range > ', t => {
    const buffer = new TextBuffer(10);
    buffer.set(['Line 1', 'Line 2', 'Line 3']);

    const pasteBinLine = 5;
    const error = t.throws(() => {
        buffer.pasteBinCopyLine(pasteBinLine);
    }, { instanceOf: Error });
    if (error !== undefined)
        t.is(error.message, 'pastebin line index out of range');
});

test('pasteBinCopyLine should throw an error if line index is out of range < 0', t => {
    const buffer = new TextBuffer(10);
    buffer.set(['Line 1', 'Line 2', 'Line 3']);

    const pasteBinLine = -2;
    const error = t.throws(() => {
        buffer.pasteBinCopyLine(pasteBinLine);
    }, { instanceOf: Error });
    if (error !== undefined)
        t.is(error.message, 'pastebin line index out of range');
});

test('pasteBinCopyLine should set the pasteBin array with the line specified', t => {
    const buffer = new TextBuffer(10);
    buffer.set(['Line 1', 'Line 2', 'Line 3']);

    const pasteBinLine = 1;
    buffer.pasteBinCopyLine(pasteBinLine);

    t.deepEqual(buffer.pasteBin, ['Line 2']);
});


test('pasteBinCopyAll', t => {
    const tb = new TextBuffer(10);
    tb.set([' line 1', ' line 2 ', 'line 3']);
    const copy = tb.pasteBinCopyAll();
    t.deepEqual(copy, ['line 1', 'line 2', 'line 3']);
});

test('pasteBinGet', t => {
    const tb = new TextBuffer(10);
    tb.pasteBin = ['line 1', 'line 2'];
    const pasteBin = tb.pasteBinGet();
    t.deepEqual(pasteBin, ['line 1', 'line 2']);
});

test('pasteBinInsertLine', t => {
    const tb = new TextBuffer(10);
    tb.set(['line 1', 'line 2', 'line 3']);
    tb.pasteBin = ['new line 1', 'new line 2'];
    tb.pasteBinInsertLine(1);
    t.deepEqual(tb.get(), ['line 1', 'new line 1', 'new line 2', 'line 2', 'line 3']);
});

test('pasteBinReplaceLine replaces line with pasteBin content', t => {
    const tb = new TextBuffer(5);
    const originalText = ['This is line 1', 'This is line 2', 'This is line 3'];
    tb.set(originalText);

    const pasteBinContent = ['New line 1', 'New line 2'];
    tb.pasteBin = pasteBinContent;

    const lineIndex = 1;
    tb.pasteBinReplaceLine(lineIndex);

    const expectedText = ['This is line 1', 'New line 1', 'New line 2', 'This is line 3'];
    const actualText = tb.get();

    t.deepEqual(actualText, expectedText);
});

test('pasteBinMutateLine should insert and remove elements from textBuf', t => {
    const tb = new TextBuffer(5);
    tb.set(['Hello', 'World']);
    tb.pasteBin = ['new', 'text'];
    tb.pasteBinMutateLine(1, 2);
    t.deepEqual(tb.textBuf, ['Hello', 'new', 'text']);
});

test('pasteBinMutateLine throws an error if insert or remove ID out of range', t => {
    const tb = new TextBuffer(3);
    tb.set(['line 1', 'line 2']);

    t.throws(() => {
        tb.pasteBinMutateLine(5, 0); // insertID out of range
    }, { instanceOf: Error, message: 'insert or remove ID out of range: 5 0' });

    t.throws(() => {
        tb.pasteBinMutateLine(0, 5); // removeID out of range
    }, { instanceOf: Error, message: 'insert or remove ID out of range: 0 5' });
});

test('endOfLines returns true when maximum number of lines is reached', t => {
    const buffer = new TextBuffer(2);
    buffer.append(['line 1']);
    buffer.append(['line 2']);

    t.true(buffer.endOfLines());

    buffer.deleteLine(1);
    t.false(buffer.endOfLines());
});

test('getMaxChar should return the number of characters in the longest line in the buffer', t => {
    const buffer = new TextBuffer(10);
    buffer.set(['one', 'two', 'three', 'four', 'five']);
    t.is(buffer.textBuf.getMaxChar(), 5);

    buffer.append(['a really long line here']);
    t.is(buffer.textBuf.getMaxChar(), 23);

    buffer.prepend(['another long line']);
    //the previously added line is still longer
    t.is(buffer.textBuf.getMaxChar(), 23);

    buffer.prepend(['supercalirfagilisticexpialidocious']);
    //newly longest line
    t.is(buffer.textBuf.getMaxChar(), 34);
});

test('TextBuffer.pasteBinFormat applies formatters to the pasteBin', t => {
    const textBuffer = new TextBuffer(10);
    const testFormatter = new TestUppercaseFormatter();

    textBuffer.append(["the owls are not what they seem"])
    textBuffer.pasteBinCopyAll();
    textBuffer.addFormatter(testFormatter);

    const expectedResult = textBuffer.pasteBin.map(line => line.toUpperCase());
    const actualResult = textBuffer.pasteBinFormat();

    t.deepEqual(actualResult, expectedResult);
});