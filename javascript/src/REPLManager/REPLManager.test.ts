import test from 'ava';
import { REPLManager, REPLSettings } from './REPLManager';


test('REPLManager: Initialization', t => {
    const repl = new REPLManager(10);

    t.truthy(repl.tb, 'Text buffer should not be null');
    t.truthy(repl.c, 'Cursor should not be null');
    t.truthy(repl.kp, 'Keypress processor should not be null');
});

test('addTab method adds spaces to text', t => {
    const repl = new REPLManager(100, new REPLSettings, [], []);
    repl.addTab();
    repl.addTab();
    repl.addTab();

    t.is(repl.tb.getLine(0), '            ');
});

test('addChar method adds a character to the buffer', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    t.is(repl.tb.getLine(0), 'H');
});

test('backSpace method removes the last character added', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    repl.backSpace(); // Deletes the character "H"
    t.is(repl.tb.getLine(0), '');
});

test('clear method clears the buffer', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    repl.clear(); // Clears the buffer
    t.is(repl.tb.getLine(0), '');
});

test('deleteChar method removes the character in front of the cursor position', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"

    repl.c.setChar(1);
    repl.deleteChar(); // Deletes the character "i"
    t.is(repl.tb.getLine(0), 'H');
});

test('gotoCharacter  move the cursor to the left', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(105); // Adds the character "i"
    repl.gotoCharacter(-1); // Moves the cursor to the left
    t.is(repl.c.position().char, 3);
    repl.gotoCharacter(-1); // Moves the cursor to the left
    t.is(repl.c.position().char, 2);
    repl.gotoCharacter(1); // Moves the cursor to the left
    t.is(repl.c.position().char, 3);
});

test('gotoLine moves cursor to the specified line', (t) => {
    const repl = new REPLManager(3);
    const initialPosition = repl.c.position();
    t.is(initialPosition.line, 0, 'initial position line should be 0');

    repl.gotoLine(1);
    const newPosition = repl.c.position();
    t.is(newPosition.line, 0, 'position line should be 0');

    repl.newLine();
    const finalPosition = repl.c.position();
    t.is(finalPosition.line, 1, 'position line should be 1');

});

test('gotoLine does not move cursor beyond last line', (t) => {
    const repl = new REPLManager(1);
    const initialPosition = repl.c.position();
    const lastLineIndex = repl.tb.length() - 1;

    repl.gotoLine(1);
    const newPosition = repl.c.position();
    t.is(newPosition.line, lastLineIndex, 'position line should be last line index');
});

test('gotoWord method moves the cursor to the next word', (t) => {
    const repl = new REPLManager(1);
    repl.addChar(72); // Adds the character "H"
    repl.addChar(105); // Adds the character "i"
    repl.addChar(32); // Adds a space
    repl.addChar(116); // Adds the character "t"
    repl.addChar(104); // Adds the character "h"
    repl.gotoWord(1); // Moves the cursor to the next word
    t.is(repl.c.position().char, 5);
});

test('jumpTo moves to the beginning of the next or previous word', (t) => {
    const replManager = new REPLManager(80);
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
    const rm = new REPLManager(1);
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


test('newLine() should add a new line to the text buffer and move the cursor to the start of the new line', t => {
    const repl = new REPLManager(80, { INDENTATION: 4, MAX_CHARS: 80 });

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
    const repl = new REPLManager(80);

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
    repl.gotoLine(-1);
    repl.deleteLine();

    // check that the second line was deleted
    t.is(repl.tb.length(), 2);
    t.is(repl.tb.getLine(0), 'hello');
    t.is(repl.tb.getLine(1), 'test');
});

test('removeLine removes the correct line', t => {
    const repl = new REPLManager(3);
    repl.addTab();
    repl.addChar(65);
    repl.newLine();
    repl.addTab();
    repl.addChar(66);
    repl.newLine();
    repl.addTab();
    repl.addChar(67);
    repl.removeLine();
    const output = repl.tb.format().toString()
    t.is(output, '    A,    B    C');
});


test('deleteLine should delete the correct line', (t) => {
    // initialize a REPLManager instance
    const repl = new REPLManager(80);

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
    repl.gotoLine(-1);
    repl.deleteLine();

    // check that the second line was deleted
    t.is(repl.tb.length(), 2);
    t.is(repl.tb.getLine(0), 'hello');
    t.is(repl.tb.getLine(1), 'test');
});