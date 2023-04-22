import test from 'ava';
import { Direction, JumpDirection, PreloadIdentifier, REPLManager, REPLSettings } from './REPLManager';
import { TextFormatter } from '../TextBuffer/TextFormatter';

test('REPLManager: Initialization', t => {
    const repl = new REPLManager();

    t.truthy(repl.tb, 'Text buffer should not be null');
    t.truthy(repl.c, 'Cursor should not be null');
    t.truthy(repl.kp, 'Keypress processor should not be null');
});

class TestFormatter implements TextFormatter {
    id = "testformatter"
    //replaces all forms of whitespace with a space and trims the end
    format(strArr: Array<string>, ctx?: {}) { return strArr; }

}
test('REPLManager buffers preload not directly added', t => {
    const config = new REPLSettings();
    const bufferFormatterMock = new TestFormatter();
    const replManager = new REPLManager(config, [], [bufferFormatterMock]);
    const formatters = replManager.tb.formatters;

    t.deepEqual(formatters, []);
});

test('preloadFormatter works as intended', (t) => {
    class CustomFormatter implements TextFormatter {
        id: string
        constructor(id) {
            this.id = id;
        }
        format(strArr: string[], ctx?: {} | undefined): string[] {
            return strArr
        }
    }

    const formatter1 = new CustomFormatter('formatter1');

    const repl = new REPLManager();

    repl.preloadFormatter(formatter1);

    t.is(repl.formatterPreloads.length, 1, 'REPLManager should have 1 formatter preloaded');
    t.is(repl.formatterPreloads[0].id, 'formatter1', 'REPLManager should have formatter with id "formatter1" preloaded');
});

test('addTab method adds spaces to text', t => {
    const repl = new REPLManager(new REPLSettings(100), []);
    repl.addTab();
    repl.addTab();
    repl.addTab();

    t.is(repl.tb.getLine(0), '            ');
});

test('addChar method adds a character to the buffer', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    t.is(repl.tb.getLine(0), 'H');
});

test('backSpace method removes the last character added', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    repl.backSpace(); // Deletes the character "H"
    t.is(repl.tb.getLine(0), '');
});

test('clear method clears the buffer', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    repl.clear(); // Clears the buffer
    t.is(repl.tb.getLine(0), '');
});

test('deleteChar method removes the character in front of the cursor position', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"

    repl.c.setChar(1);
    repl.deleteChar(); // Deletes the character "i"
    t.is(repl.tb.getLine(0), 'H');
});

test('gotoCharacter  move the cursor to the left', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(105); // Adds the character "i"
    repl.jumpChar(-1); // Moves the cursor to the left
    t.is(repl.c.position().char, 3);
    repl.jumpChar(-1); // Moves the cursor to the left
    t.is(repl.c.position().char, 2);
    repl.jumpChar(1); // Moves the cursor to the left
    t.is(repl.c.position().char, 3);
});

test('gotoLine moves cursor to the specified line', (t) => {
    const repl = new REPLManager(new REPLSettings(3));
    const initialPosition = repl.c.position();
    t.is(initialPosition.line, 0, 'initial position line should be 0');

    repl.jumpLine(1);
    const newPosition = repl.c.position();
    t.is(newPosition.line, 0, 'position line should be 0');

    repl.newLine();
    const finalPosition = repl.c.position();
    t.is(finalPosition.line, 1, 'position line should be 1');

});

test('gotoLine does not move cursor beyond last line', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    const initialPosition = repl.c.position();
    const lastLineIndex = repl.tb.length() - 1;

    repl.jumpLine(1);
    const newPosition = repl.c.position();
    t.is(newPosition.line, lastLineIndex, 'position line should be last line index');
});

function preloadTest(k: number, ctx: any): any {
    return 'external test function'
}

test('test preload function', (t) => {

    const preload: PreloadIdentifier = {
        id: 'testFunction',
        func: (k: number, ctx: any): any => 'test function'
    }

    const extPreload: PreloadIdentifier = {
        id: 'extTestFunction',
        func: preloadTest
    }

    const jsonConfig = `{
        "bindings":[
        {
          "id": "testFunc2",
          "asciiCode": 2,
          "functions": "testFunction"
        },
        {
            "id": "testFunc3",
            "asciiCode": 3,
            "functions": "extTestFunction"
          }
      ]}`;

    const repl = new REPLManager(new REPLSettings(100), [preload, extPreload]);
    repl.kp.loadConfigFromJSON(jsonConfig);
    const res = repl.kp.processKeypress(2);
    const output = res[0](1, {});
    t.is(output, 'test function');
    const res1 = repl.kp.processKeypress(3);
    const output1 = res1[0](1, {});
    t.is(output1, 'external test function');
});

test('gotoWord method moves the cursor to the next word', (t) => {
    const repl = new REPLManager(new REPLSettings(1));
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(32); // Adds a space
    repl.addChar(116); // Adds the character "t"
    repl.addChar(104); // Adds the character "h"
    repl.jumpWord(1); // Moves the cursor to the next word
    t.is(repl.c.position().char, 5);
});

test('jumpTo moves to the beginning of the next or previous word', (t) => {
    const replManager = new REPLManager(new REPLSettings(80));
    replManager.clear();
    replManager.addChar(97);
    replManager.addChar(98);
    replManager.addChar(99);
    replManager.addChar(32);
    replManager.addChar(100);
    replManager.addChar(101);
    replManager.addChar(102);

    // jump to end of line, makes no difference
    replManager.jumpTo(1);
    t.is(replManager.c.position().char, 7);

    // jump to beginning of line
    replManager.jumpTo(0);
    t.is(replManager.c.position().char, 0);

    // jump to end of line again
    replManager.jumpTo(1);
    t.is(replManager.c.position().char, 7);

    // add more characters and spaces
    replManager.addTab();
    replManager.addChar(103);
    replManager.addChar(104);
    replManager.addChar(105);
    replManager.addChar(32);
    replManager.addChar(106);
    replManager.addChar(107);
    replManager.addChar(108);

    // jump to end of line
    replManager.jumpTo(1);
    t.is(replManager.c.position().char, 18);

    // jump to the start of the line
    replManager.jumpTo(0);
    t.is(replManager.c.position().char, 0);

    //TODO: test moving top to bottom
});

test('gotoIndex moves to correct index', (t) => {
    const rm = new REPLManager(new REPLSettings(1));
    rm.clear();
    rm.addChar(72);
    rm.addChar(101);
    rm.addChar(108);
    rm.addChar(108);
    rm.addChar(111);
    rm.gotoIndex(0);
    t.is(rm.c.position().char, 0);
    rm.gotoIndex(2);
    t.is(rm.c.position().char, 2);
    rm.gotoIndex(5);
    t.is(rm.c.position().char, 5);
});


test('newLine should add a new line to the text buffer and move the cursor to the start of the new line', t => {
    const repl = new REPLManager(new REPLSettings());

    // Simulate typing some text
    repl.addChar(72); // H
    repl.addChar(101); // e
    repl.addChar(108); // l
    repl.addChar(108); // l
    repl.addChar(111); // o

    // Add a new line
    repl.newLine();

    // Check that a new line was added
    t.is(repl.tb.length(), 2);

    // Check that the cursor moved to the start of the new line
    const pos = repl.c.position();
    t.is(pos.line, 1);
    t.is(pos.char, 0);

    // Add a new line
    repl.newLine();

    // Check that a new line was added
    t.is(repl.tb.length(), 3);

    // Check that the cursor moved to the start of the new line
    const pos2 = repl.c.position();
    t.is(pos2.line, 2);
    t.is(pos2.char, 0);
});

test('newline should work when lines have text in', (t) => {
    // initialize a REPLManager instance
    const repl = new REPLManager(new REPLSettings());

    // add some lines
    repl.addChar('h'.charCodeAt(0));
    repl.addChar('e'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('o'.charCodeAt(0));
    t.is(repl.tb.getLine(0), 'hello');
    repl.newLine();
    t.is(repl.tb.getLine(0), 'hello');
    t.not(repl.tb.getLine(1), 'hello');
    t.is(repl.tb.getLine(1), '');
    repl.addChar('w'.charCodeAt(0));
    repl.addChar('o'.charCodeAt(0));
    repl.addChar('r'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('d'.charCodeAt(0));
    repl.newLine();
    repl.addChar('t'.charCodeAt(0));
    repl.addChar('e'.charCodeAt(0));
    repl.addChar('s'.charCodeAt(0));
    repl.addChar('t'.charCodeAt(0));

    // delete the second line
    repl.jumpLine(-1);
    repl.deleteLine();

    // check that the second line was deleted
    t.is(repl.tb.length(), 2);
    t.is(repl.tb.getLine(0), 'hello');
    t.is(repl.tb.getLine(1), 'test');
});

test('spliceLine removes the correct line', t => {
    const repl = new REPLManager(new REPLSettings(3));
    repl.addTab();
    repl.addChar(65);
    repl.newLine();
    repl.addTab();
    repl.addChar(66);
    repl.newLine();
    repl.addTab();
    repl.addChar(67);
    repl.spliceLine();
    const output = repl.tb.format().toString()
    t.is(output, '    A,    B    C');
});


test('deleteLine should delete the correct line', (t) => {
    // initialize a REPLManager instance
    const repl = new REPLManager();

    // add some lines
    repl.addChar('h'.charCodeAt(0));
    repl.addChar('e'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('o'.charCodeAt(0));
    repl.newLine();
    repl.addChar('w'.charCodeAt(0));
    repl.addChar('o'.charCodeAt(0));
    repl.addChar('r'.charCodeAt(0));
    repl.addChar('l'.charCodeAt(0));
    repl.addChar('d'.charCodeAt(0));
    repl.newLine();
    repl.addChar('t'.charCodeAt(0));
    repl.addChar('e'.charCodeAt(0));
    repl.addChar('s'.charCodeAt(0));
    repl.addChar('t'.charCodeAt(0));

    // delete the second line
    repl.jumpLine(-1);
    repl.deleteLine();

    // check that the second line was deleted
    t.is(repl.tb.length(), 2);
    t.is(repl.tb.getLine(0), 'hello');
    t.is(repl.tb.getLine(1), 'test');
});

// //mock a state which would test lines 89-92 of add char
test('addChar function returns true if this.tb.endOfLines() returns true', t => {
    const repl = new REPLManager();
    const state = {
        c: {
            position: () => ({
                char: 123
            }),
            incrementChar: () => { }
        },
        config: {
            MAX_CHARS: 1000
        },
        tb: {
            endOfLines: () => true,
            insertCharAt: () => { }
        },
        newLine: () => { }
    };
    const result = repl.addChar.call(state, 65);
    t.is(result, undefined);
});

test('backSpace should remove a character', t => {
    const repl = new REPLManager(new REPLSettings(10));
    repl.addChar(97);
    repl.addChar(98);
    repl.backSpace();
    // expect line to be "a"
    t.is(repl.tb.getLine(0), "a");
});

test('backSpace should remove a character at the end of a line and move to previous line', t => {
    const repl = new REPLManager(new REPLSettings(10));
    repl.addChar(97);
    repl.addChar(98);
    repl.newLine();
    repl.addChar(99);
    repl.backSpace();
    // expect line to be "ab"
    t.is(repl.tb.getLine(0), "ab");
});

test('backSpace should remove a line if the cursor is at the beginning', t => {
    const repl = new REPLManager(new REPLSettings(10));
    repl.addChar(97);
    repl.newLine();
    repl.backSpace();
    // expect only one line left
    t.is(repl.tb.length(), 1);
});

test('backSpace should do nothing if the cursor is at char 0 and the beginning of the first line is reached', t => {
    const repl = new REPLManager(new REPLSettings(10));
    repl.backSpace();
    // expect empty TextBuffer
    t.deepEqual(repl.tb.get(), ['']);
});

test('should return position at the left end of the line when direction is -1', t => {
    const replManager = new REPLManager(new REPLSettings(10));
    replManager.jumpTo(3); // go to bottom
    replManager.jumpTo(1); // go to end of the line
    replManager.jumpChar(-1);
    const pos = replManager.c.position();
    t.is(pos.char, 0);
});

test('should return position at the beginning of the line when already at the beginning of the line and direction is -1', t => {
    const replManager = new REPLManager(new REPLSettings(10));
    replManager.jumpTo(0); // go to the beginning of the line
    replManager.jumpChar(-1);
    const pos = replManager.c.position();
    t.is(pos.char, 0);
});

test('should return position at the right end of the line when direction is 1', t => {
    const replManager = new REPLManager(new REPLSettings(10));
    replManager.addChar(65); // Add A
    replManager.addChar(65); // Add A
    replManager.jumpChar(1);
    const pos = replManager.c.position();
    t.is(pos.char, 2);
});

test('should return position at the end of the line when already at the end of the line and direction is 1', t => {
    const replManager = new REPLManager(new REPLSettings(10));
    replManager.addChar(65); // Add A
    replManager.jumpChar(1);
    const pos = replManager.c.position();
    t.is(pos.char, 1);
});

test('jumpLine - else branch', t => {
    const rl = new REPLManager(new REPLSettings(20));

    rl.tb.set(['a'.repeat(20), 'b'.repeat(20)]);

    rl.c.setLine(1);
    rl.c.setChar(5);

    rl.jumpLine(-1);

    const currentLine = rl.c.line();

    t.is(currentLine, 0); // Check if lines are the same before and after the operation
});

test('jumpWord', (t) => {
    const manager = new REPLManager(new REPLSettings())
    const input = 'word1 word2 word3 word4'
    for (var i = 0; i < input.length; i++) {
        manager.addChar(input.charCodeAt(i));
    }

    var pos = manager.c.position()
    var len = manager.tb.lineLength(pos.line)

    t.deepEqual(pos, { line: 0, char: 23 })

    manager.jumpWord(-1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 0, char: 17 })

    manager.jumpWord(1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 0, char: 23 })

    manager.jumpWord(-1)
    manager.jumpWord(-1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 0, char: 11 })

    manager.tb.append(['word5 word6 word7 word8 word9'])

    manager.jumpTo(JumpDirection.END)
    manager.jumpTo(JumpDirection.EOL)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 1, char: 29 })

    manager.jumpWord(-1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 1, char: 23 })

    manager.jumpWord(1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 1, char: 29 })

    manager.jumpLine(-1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 0, char: 23 })

    manager.jumpWord(-1)
    pos = manager.c.position()
    t.deepEqual(pos, { line: 0, char: 17 })

})

test('jumpword else clause', t => {
    const repl = new REPLManager();
    repl.jumpTo(3);
    t.is(repl.c.line(), 0);
    repl.jumpWord(-1);
    t.is(repl.c.char(), 0);
});

test('jumpTo function tests all branches', t => {
    //beginning of line
    let repl = new REPLManager(new REPLSettings(2));
    repl.addTab(); repl.addTab(); repl.addTab();
    //jump to beginning of line
    repl.jumpTo(JumpDirection.BOL)
    let pos = repl.c.position();
    t.is(pos.char, 0)

    //end of line
    repl = new REPLManager(new REPLSettings(2));
    repl.addTab(); repl.addTab(); repl.addTab();
    //jump to end of line
    repl.jumpTo(JumpDirection.EOL)
    pos = repl.c.position();
    t.is(pos.char, 12)

    //top of text array
    repl = new REPLManager(new REPLSettings(2));
    repl.addTab(); repl.addTab(); repl.addTab();
    repl.newLine(); repl.addTab(); repl.addTab(); repl.addTab();
    //jump to beginning (top)
    repl.jumpTo(JumpDirection.TOP)
    pos = repl.c.position();
    t.is(pos.char, 12)
    t.is(pos.line, 0);

    //bottom of text array
    repl = new REPLManager(new REPLSettings(3));
    repl.addTab();
    repl.newLine(); repl.addTab();
    repl.newLine(); repl.addTab();
    //jump to end (bottom)
    repl.jumpTo(JumpDirection.END)
    pos = repl.c.position();
    t.is(pos.char, 4)
    t.is(pos.line, 2);
});

test('gotoIndex', t => {
    // create an empty REPLManager
    const rm = new REPLManager(new REPLSettings(2));

    // add some chars to the buffer
    rm.addChar(72); rm.addChar(101); rm.addChar(108); rm.addChar(108); rm.addChar(111);

    // move the cursor to the index 2
    rm.gotoIndex(2);

    // check that the cursor is at the correct position
    t.deepEqual(rm.c.position(), { line: 0, char: 2 });

    // move the cursor to the index -1
    rm.gotoIndex(-1);

    // check that the cursor is at the correct position
    t.deepEqual(rm.c.position(), { line: 0, char: 0 });

    // move the cursor to an index greater than the max length
    rm.gotoIndex(100);

    // check that the cursor is at the end of the last line
    t.deepEqual(rm.c.position(), { line: 0, char: 5 });
});

test('newLine adds a new line after the current line', t => {
    const replManager = new REPLManager(new REPLSettings(10)); // initialize the text buffer with size 10
    replManager.addChar(65); // add A to the first line
    replManager.addChar(66); // add B to the first line
    replManager.newLine(); // add a new line, now we should be on the second line
    replManager.addChar(67); // add C to the second line

    t.is(replManager.tb.getLine(0), 'AB');
    t.is(replManager.tb.getLine(1), 'C');
});

test('When user tries to create new line and reaches the end of the buffer, an exception should be thrown', t => {
    const replManager = new REPLManager(new REPLSettings(1));
    const error = t.throws(() => {
        replManager.newLine();
    }, { instanceOf: Error });
    if (error !== undefined)
        t.is(error.message, 'End of lines reached, cannot create new line');
});

test('deleteLine function should work properly', t => {
    const replManager = new REPLManager(new REPLSettings(30));

    replManager.tb.set(['line1'])
    let pos = replManager.c.position();
    replManager.deleteLine();
    let after = replManager.c.position();

    // Test 1 - for a line within range
    replManager.tb.set([
        "line1",
        "line2",
        "line3",
        "line4",
        "line5",
        "line6",
        "line7",
        "line8",
        "line9",
        "line10"
    ]);
    replManager.c.setLine(5);
    let posBefore = replManager.c.position();
    replManager.deleteLine();
    let posAfter = replManager.c.position();
    t.is(replManager.tb.length(), 9);
    t.is(posAfter.line, posBefore.line);
    t.is(posAfter.char, replManager.tb.lineLength(posAfter.line));

    // Test 2 - delete last line
    replManager.c.setLine(replManager.tb.length() - 1);
    let posBeforeLast = replManager.c.position();
    replManager.deleteLine();
    let posAfterLast = replManager.c.position();
    t.is(replManager.tb.length(), 8);
    t.is(posAfterLast.line, posBeforeLast.line - 1);
    t.is(posAfterLast.char, posBeforeLast.char);

    // Test 3 - for the last line
    replManager.c.setLine(replManager.tb.length() - 1);
    const posLast = replManager.c.position();
    replManager.deleteLine();
    t.is(replManager.tb.length(), 7);
    t.is(replManager.c.line(), 6);
    t.is(replManager.c.char(), replManager.tb.lineLength(6));


});

test('jumpChar with dir === 1 at end of line with no new line maintains position', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.jumpChar(1 as Direction);
    //stays in the same place
    t.is(repl.c.position().char, 3);
});

test('jumpChar with dir === -1 moves the cursor one character to the left', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.jumpChar(-1 as Direction);
    t.is(repl.c.position().char, 2);
});

test('jumpChar with dir === 1 not at end line moves the cursor one character to the left', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.jumpChar(-1 as Direction);
    repl.jumpChar(-1 as Direction);
    t.is(repl.c.position().char, 1);
    repl.jumpChar(1 as Direction);
    t.is(repl.c.position().char, 2);
    repl.jumpChar(1 as Direction);
    t.is(repl.c.position().char, 3);
    repl.jumpChar(1 as Direction);
    t.is(repl.c.position().char, 3);
});

test('jumpChar with dir === -1 at the beginning of the line moves the cursor to the previous line', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.jumpTo(JumpDirection.BOL);
    repl.jumpChar(-1 as Direction);
    t.is(repl.c.position().line, 0);
    t.is(repl.c.position().char, 3);
});

test('jumpChar with dir === 1 at the end of the line moves the cursor to the next line', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.jumpTo(JumpDirection.TOP);
    repl.jumpChar(1 as Direction);
    repl.jumpChar(1 as Direction);
    repl.jumpChar(1 as Direction);
    t.is(repl.c.position().line, 1);
    t.is(repl.c.position().char, 2);
});

test('deleteChar else branch - when cursor is at the end of last line', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.jumpTo(JumpDirection.EOL); // cursor is at the end of last line
    repl.deleteChar(); // should not delete anything
    t.is(repl.tb.getLine(0), "abc");
});

test('deleteChar if clause inside the else branch', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.jumpTo(JumpDirection.TOP);
    repl.jumpTo(JumpDirection.EOL);
    repl.deleteChar();
    t.is(repl.tb.getLine(0), "abcdef");
    t.is(repl.c.position().line, 0);
    t.is(repl.c.position().char, 3);
});

test('set method - replace all text', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.set(["xyz", "123"]);


    t.is(repl.tb.getLine(0), "xyz");
    t.is(repl.tb.getLine(1), "123");
    t.is(repl.tb.length(), 2);
    t.is(repl.c.position().line, 1);
    t.is(repl.c.position().char, 3);

});

test('insert method - insert between totalLines', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.insert(1, ["xyz", "123"]);
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.getLine(1), "xyz");
    t.is(repl.tb.getLine(2), "123");
    t.is(repl.tb.getLine(3), "def");
    t.is(repl.tb.length(), 4);
});


test('insert method - append to code and insert empty strings', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.insert(2, ["xyz", "123"]);
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.getLine(1), "");
    t.is(repl.tb.getLine(2), "xyz");
    t.is(repl.tb.getLine(3), "123");
    t.is(repl.tb.length(), 4);
});


test('insert method - too many lines', t => {
    const repl = new REPLManager(new REPLSettings(4));
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    const error = t.throws(() => {
        repl.insert(1, ["xyz", "123", "456"]);
    }, { instanceOf: Error });
    t.is(error?.message, 'too many lines');
});

test('remove method - remove at specified index', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.newLine();
    repl.add("ghi");
    repl.remove(1);
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.getLine(1), "ghi");
    t.is(repl.tb.length(), 2);
});

test('remove method - remove last line if no index provided', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.remove();
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.length(), 1);
});

test('prepend method - prepend lines to the beginning', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine()
    repl.add("def");
    repl.prepend(["123", "456"]);
    t.is(repl.tb.getLine(0), "123");
    t.is(repl.tb.getLine(1), "456");
    t.is(repl.tb.getLine(2), "abc");
    t.is(repl.tb.getLine(3), "def");
    t.is(repl.tb.length(), 4);
});

test('append method - append lines to the end', t => {
    const repl = new REPLManager();
    repl.add("abc");
    repl.newLine();
    repl.add("def");
    repl.append(["123", "456"]);
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.getLine(1), "def");
    t.is(repl.tb.getLine(2), "123");
    t.is(repl.tb.getLine(3), "456");
    t.is(repl.tb.length(), 4);
});

test('add method - char code 13 or 10', t => {
    const repl = new REPLManager();
    repl.add("abc\r\ndef");
    t.is(repl.tb.getLine(0), "abc");
    t.is(repl.tb.getLine(1), "");
    t.is(repl.tb.getLine(2), "def");
    t.is(repl.tb.length(), 3);
});

test('addChar method - endOfLines() is true', t => {
    const repl = new REPLManager();
    const maxLength = repl.config.BUFFER_SIZE * (repl.config.MAX_CHARS + 1); // ensure we reach the end of lines

    let errorThrown = false;

    try {
        for (let i = 0; i < maxLength; i++) {
            repl.addChar(65); // Add 'A' character
        }
    } catch (error) {
        errorThrown = true;
        t.is(error.message, "reached end of lines");
    }

    t.true(errorThrown);
});


test('keyPress should not execute when no matching key is found', t => {
    const repl = new REPLManager();
    const messages = repl.keyPress(5);
    t.deepEqual(messages, []);
});

test('keyPress should execute a single matching function', t => {
    const repl = new REPLManager();
    let executed = false;
    repl.kp.attachFunctions("test", 1, [() => { executed = true; }]);
    const messages = repl.keyPress(1);
    t.true(executed);
    t.deepEqual(messages, []);
});

test('keyPress should execute multiple matching functions', t => {
    const repl = new REPLManager();
    let executed1 = false;
    let executed2 = false;
    repl.kp.attachFunctions("test", 1, [() => { executed1 = true; }, () => { executed2 = true; }]);
    const messages = repl.keyPress(1);
    t.true(executed1);
    t.true(executed2);
    t.deepEqual(messages, []);
});

test('keyPress should return messages from matching functions', t => {
    const repl = new REPLManager();
    repl.kp.attachFunctions("test", 1, [() => { return ['message1', 'message2']; }]);
    const messages = repl.keyPress(1);
    t.deepEqual(messages, ['message1', 'message2']);
});

test('keyPress should catch and return errors thrown by matching functions', t => {
    const repl = new REPLManager();
    repl.kp.attachFunctions("test", 1, [() => {
        throw new Error('Function failed');
    }]);
    const messages = repl.keyPress(1);
    t.deepEqual(messages, ['error Function failed']);
});

test('keyPress should execute all matching functions even if some fail', t => {
    const repl = new REPLManager();
    let executed1 = false;
    let executed2 = false;
    repl.kp.attachFunctions("test", 1, [
        () => { executed1 = true; },
        () => { throw new Error('Function failed'); },
        () => { executed2 = true; }
    ]);
    const messages = repl.keyPress(1);
    t.true(executed1);
    t.true(executed2);
    t.deepEqual(messages, ['error Function failed']);
});

test('keyPress should execute all matching functions in order', t => {
    const repl = new REPLManager();
    let order = 0;
    repl.kp.attachFunctions("test", 1, [
        () => { t.is(order, 0); order++; },
        () => { t.is(order, 1); order++; },
        () => { t.is(order, 2); order++; },
        () => { t.is(order, 3); }
    ]);
    repl.keyPress(1);
    t.is(order, 3);
});

test('commentLine', t => {
    const repl = new REPLManager(new REPLSettings());
    const testInput = ['Test line 1', 'Test line 2', '// Test line 3'];
    repl.set(testInput);
    repl.jumpTo(JumpDirection.TOP);
    repl.commentLine(); // Comment first line
    t.is(repl.tb.getLine(0), '// Test line 1');

    repl.jumpLine(1); // Move to second line
    repl.commentLine(); // Comment second line
    t.is(repl.tb.getLine(1), '// Test line 2');

    repl.jumpLine(1); // Move to third line
    repl.commentLine(); // Uncomment third line
    t.is(repl.tb.getLine(2), 'Test line 3');
});

test('loadConfigFromJSON loads settings from JSON correctly', (t) => {
    const jsonData = {
        "settings": {
            "repl": {
                "MAX_CHARS": "90",
                "BUFFER_SIZE": "80",
                "setting3": true,
            }
        },
        "bindings": []
    };
    const jsonStr = JSON.stringify(jsonData);

    const testClass = new REPLManager();

    t.notThrows(() => testClass.loadConfigFromJSON(jsonStr), 'should not throw error when loading a JSON with settings and bindings');

});

test("loadConfigFromJSON updates settings and doesn't throw", (t) => {
    const config = {
        settings: { "repl": { INDENTATION: 2, MAX_CHARS: 90, BUFFER_SIZE: 40, CMNT: "#" } },
        bindings: []
    };
    const jsonConfig = JSON.stringify(config);

    const replSettings = new REPLSettings();
    const replManager = new REPLManager(replSettings);

    t.notThrows(() => replManager.loadConfigFromJSON(jsonConfig));
    t.is(replManager.config.INDENTATION, 2);
    t.is(replManager.config.MAX_CHARS, 90);
    t.is(replManager.config.BUFFER_SIZE, 40);
    t.is(replManager.config.CMNT, "#");
});

test("loadConfigFromJSON updates incomplete settings and doesn't throw", (t) => {
    const config = {
        settings: { "repl": { INDENTATION: 2, } },
        bindings: []
    };
    const jsonConfig = JSON.stringify(config);

    const replSettings = new REPLSettings();
    const replManager = new REPLManager(replSettings);

    t.notThrows(() => replManager.loadConfigFromJSON(jsonConfig));
    t.is(replManager.config.INDENTATION, 2);
    t.is(replManager.config.MAX_CHARS, 80);
    t.is(replManager.config.BUFFER_SIZE, 30);
    t.is(replManager.config.CMNT, "//");
});

test("updateWith updates REPLSettings properties correctly", (t) => {
    const initialSettings = new REPLSettings(30, 80, 4);
    const updatedSettings = new REPLSettings(50, 100, 2);
    updatedSettings.CMNT = "/*";

    initialSettings.updateWith(updatedSettings);

    t.is(initialSettings.INDENTATION, 2);
    t.is(initialSettings.MAX_CHARS, 100);
    t.is(initialSettings.BUFFER_SIZE, 50);
    t.is(initialSettings.CMNT, "/*");
});

test("cmntToChars works when called directly", (t) => {
    const settings = new REPLSettings();
    settings.CMNT = "/*";
    settings.cmntToChars();

    t.deepEqual(settings.CMNT_CHARS, [47, 42, 32]);
});

test("cmntToChars works when called via updateWith", (t) => {
    const initialSettings = new REPLSettings();
    const updatedSettings = new REPLSettings();
    updatedSettings.CMNT = "/*";

    initialSettings.updateWith(updatedSettings);

    t.deepEqual(initialSettings.CMNT_CHARS, [47, 42, 32]);
});

test('loadConfigFromJson removes attachedFunctions from KeyProcessor', (t) => {

    const repl = new REPLManager();

    let executed1 = false;
    repl.kp.attachFunctions("test", 42, [
        () => { executed1 = true; },
    ]);

    const newSettings = {
        settings: {
            repl: {
                MAX_CHARS: 100,
                INDENTATION: 2
            }
        }
    };

    repl.keyPress(42)
    t.true(executed1)
    executed1 = false;
    //unbind the original settings when loading new ones
    repl.loadConfigFromJSON(JSON.stringify(newSettings));
    repl.keyPress(42)

    t.false(executed1)
});

test('loadConfigFromJson can load formatter by id', (t) => {
    class CustomFormatter implements TextFormatter {
        id: string
        constructor(id) {
            this.id = id;
        }
        format(strArr: string[], ctx?: {} | undefined): string[] {
            return strArr
        }
    }

    const formatter1 = new CustomFormatter('formatter1');
    const formatter2 = new CustomFormatter('formatter2');

    const repl = new REPLManager(undefined, undefined, [formatter1, formatter2]);

    const newSettings = {
        settings: {
            textbuffer: {
                formatters: ['formatter2']
            }
        }
    };

    repl.loadConfigFromJSON(JSON.stringify(newSettings));

    t.is(repl.tb.formatters.length, 1, 'TextBuffer should have 1 formatter');
    t.is(repl.tb.formatters[0].id, 'formatter2', 'TextBuffer should load formatter with id "formatter2"');
});


test('preloadFormatter can preload formatter and load it from json', t => {

    const repl = new REPLManager();

    class CustomFormatter implements TextFormatter {
        id: string = "customformatter"
        constructor() { }
        format(strArr: string[], ctx?: {} | undefined): string[] {
            return strArr.map(line => line.toUpperCase());
        }
    }
    const testFormatter = new CustomFormatter()
    repl.preloadFormatter(testFormatter)

    const input = 'this is a test';
    const expectedResult = ['THIS IS A TEST'];

    const jsonConfiguration = JSON.stringify({
        settings: {
            repl: {},
            textbuffer: {
                formatters: [testFormatter.id]
            }
        }
    });

    repl.loadConfigFromJSON(jsonConfiguration);
    repl.add(input);

    const actualResult = repl.tb.format();
    t.deepEqual(actualResult, expectedResult);
});

var testData: Array<number> = []
function replayfunc(k, ctx) {
    testData.push(k);
}
test('Replay method test', (t) => {
    const replManager = new REPLManager(new REPLSettings());
    replManager.kp.attachFunctions("test", 127, [replayfunc])
    const input = ['hello', 'world'];
    replManager.replay(input);
    t.is(replManager.tb.length(), 3);
    t.is(testData.length, 10);
});


test('Keypress function triggering test', (t) => {
    let keyPressTriggered = false;
    let keyPressTriggered2 = false;
    const replManager = new REPLManager();
    const testFunction = (key, ctx) => {
        keyPressTriggered = true;
    };
    const testFunction2 = (key, ctx) => {
        keyPressTriggered2 = true;
    };

    replManager.kp.customAlphaNum(true)
    replManager.kp.attachFunctions("testFunction", 65, [testFunction])
    replManager.kp.attachFunctions("testFunction2", 66, [testFunction2])

    replManager.keyPress(65);
    t.true(keyPressTriggered);
    t.false(keyPressTriggered2);
    replManager.keyPress(66);
    t.true(keyPressTriggered);
    t.true(keyPressTriggered2);
});

//This is a real edge case seen
test('ephemeral mode on and clear line does not break status output', (t) => {
    const repl = new REPLManager();
    repl.clear();
    let clearStatus = repl.status();
    t.is(clearStatus[0], 'lines 1')
    //we can't call the run line command specifically here as it's part of the max interface but we can simulate what it does
    repl.tb.deleteLine(repl.c.line());
    var lineDeleteStatus = repl.status();
    t.not(lineDeleteStatus[0], 'lines 0')
    t.is(lineDeleteStatus[0], 'lines 1')
});

test('filling to end of buffer does not eroneously increment the cursor to one', (t) => {
    const repl = new REPLManager();
    repl.config.MAX_CHARS = 10;

    let startCursor = repl.c.position()
    repl.add("0")
    repl.add("1")
    repl.add("2")
    repl.add("3")
    repl.add("4")
    repl.add("5")
    repl.add("6")
    repl.add("7")
    repl.add("8")
    repl.add("9")
    let cursor = repl.c.position();
    t.is(cursor.line, 0)
    t.is(cursor.char, 10)
    repl.add("0")
    cursor = repl.c.position();
    t.is(cursor.line, 1)
    t.is(cursor.char, 1)
})