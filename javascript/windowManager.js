const cursor = require("./cursor.js");

// add multiple spaces to the text (tab)
exports.addTab = function () {
    const pos = cursor.position()
    var numSpaces = INDENTATION - (cursor.char % INDENTATION);
    for (var i = 0; i < numSpaces; i++) {
        addChar(32);
    }
}

exports.clear = function () {
    cursor.reset()
    //totalLines = 1;
    textBuf.clear();
    draw();
}

// add multiple spaces to the text (tab)
exports.addTab = function () {
    var numSpaces = INDENTATION - (curChar % INDENTATION);
    for (var i = 0; i < numSpaces; i++) {
        addChar(32);
    }
}

function disableText() {
    isDisabled = 1 - isDisabled;
    alpha(1.0 - isDisabled * 0.5);
}

// add a character (alpha-numeric, numeric, special characters)
function addChar(k) {
    var pos = cursor.position();
    if (pos.char >= MAX_CHARS) {
        if (endOfLines()) {
            return;
        } else {
            newLine();
        }
    }
    // ascii code to string
    var c = String.fromCharCode(k);
    // insert character at index
    textBuf.insertCharAt(pos.line, pos.char, c);
    // increment current character
    cursor.incrementChar();
}
exports.addChar = addChar;

// backspace a character
exports.backSpace = function () {
    // decrement character index
    cursor.decrementChar()

    var pos = cursor.position()
    if (pos.char >= 0) {
        // remove character at index
        textBuf.removeCharAt(pos.line, pos.char);
    } else if (pos.char > 0) {
        // remove line if at beginning of line
        removeLine();
    } else {
        // else index is 0
        cursor.resetChar();
    }
}

// delete a character (oposite of backspace)
exports.deleteChar = function () {
    var pos = cursor.position()
    if (pos.char < textBuf.lineLength(pos.line)) {
        textBuf.setLine(pos.line, textBuf.getLine(pos.line).removeCharAt(pos.char))
    } else {
        if (pos.line < textBuf.length() - 1) {
            gotoLine(1);
            removeLine();
        }
    }
}

// return the highest number of characters in one line
function getMaxChar() {
    var lengths = [];
    for (var l = 0; l < textBuf.length(); l++) {
        lengths[l] = textBuf.lineLength(l);
    }
    var sortArr = lengths.slice(0);
    sortArr.sort(function (a, b) { return b - a });

    return sortArr[0];
}

// move one character to the right or left
function gotoCharacter(k) {

    var pos = cursor.position()
    cursor.setChar(pos.char + (k * 2 - 1));
    pos = cursor.position()
    var len = textBuf.lineLength(pos.line);

    if (pos.char < 0 && pos.line > 0) {
        gotoLine(0);
        jumpTo(1);
    } else if (pos.char > len && pos.line != textBuf.length() - 1) {
        gotoLine(1);
        jumpTo(0);
    } else {
        cursor.setChar(Math.min(len, Math.max(0, pos.char)))
    }
}

// move one line up or down
function gotoLine(k) {
    var pos = cursor.position()
    k = k * 2 - 1;
    var prevLen = textBuf.lineLength(pos.line);

    cursor.setLine(Math.min(Math.max(0, (pos.line + k)), textBuf.length() - 1))
    pos = cursor.position()
    var len = textBuf.lineLength(pos.line);

    if (pos.char == prevLen) {
        cursor.setChar(len);
    } else {
        cursor.setChar(Math.min(len, curChar));
    }
}

// jump to the next or previous word (looks for seprated by spaces)
function gotoWord(k) {
    var pos = cursor.position()
    if (k === 0) {
        var l = textBuf.getLine(pos.line).slice(0, pos.char);
        if (l.match(/\ +[^ ]*$/g)) {
            var move = l.match(/\s+[^\s]*(\s?)+$/g)[0].length;
            cursor.setChar(pos.char - move);
        } else {
            jumpTo(0);
            gotoCharacter(0);
        }
    } else if (k === 1) {
        var l = textBuf.getLine(curLine).slice(curChar);
        if (l.match(/^[^ ]*\ +/g)) {
            var move = l.match(/^(\s?)+[^\s]*/g)[0].length;
            cursor.setChar(pos.char + move);
        } else {
            jumpTo(1);
            gotoCharacter(1);
        }
    }
}

// jump to beginning/end of line or top/bottom
function jumpTo(k) {
    var pos = cursor.position()
    var len = textBuf.lineLength(pos.line);
    switch (k) {
        // beginning of line
        case 0: cursor.setChar(0); break;
        // end of line
        case 1: cursor.setChar(len); break;
        // to beginning (top)
        case 2:
            cursor.setLine(0);
            len = textBuf.lineLength(0);
            //TODO: test this logic!
            cursor.setChar(Math.min(len, pos.char))
            break;
        // to end (bottom)
        case 3:
            pos.line = textBuf.length() - 1;
            len = textBuf.lineLength(pos.line);
            cursor.setChar(Math.min(len, pos.char))
            break;
    }
}

// move the cursor to the index of the letter in the full text
function gotoIndex(i) {
    // go to beginning if index less then 0
    if (i < 0) {
        jumpTo(0);
        jumpTo(2);
        return;
    }
    // else move to the index by checking every line length
    for (var l = 0; l < textBuf.length; l++) {
        if (i < textBuf.lineLength(l)) {
            cursor.setLine(l)
            cursor.setChar(i)
            return;
        } else {
            // curLine = l;
            // curChar = textBuf[l].length;
            i -= textBuf.lineLength(l);
        }
    }
    // else jump to end if index greater than max length;
    jumpTo(3);
    jumpTo(1);
}

function newLine() {
    if (endOfLines()) {
        return;
    }
    // split array in left and right of cursor
    var pos = cursor.position();
    var line = textBuf.getLine(pos.line);
    var l = line.slice(0, pos.char);
    var r = line.slice(pos.char);

    // store line left on current line
    textBuf.setLine(pos.line) = l;

    // update the line position
    pos.line = cursor.incrementLine();

    // insert new line on right side of cursor
    var u = textBuf.slice(0, pos.line);
    u = Array.isArray(u) ? u : [u];
    u.push(r);
    // store to array
    textBuf = u.concat(textBuf.slice(pos.line));
    // jump to beginning of line
    jumpTo(0);
}

function removeLine() {
    // cursors at end of previous line
    const line = cursor.getLine()
    cursor.setChar(textBuf.lineLength(line - 1))

    textBuf.spliceLine(line)

    // update the line position
    cursor.setLine(Math.max(0, line - 1));
}

function deleteLine() {
    if (textBuf.length() == 1) {
        textBuf.clear();
        cursor.setLine(0);
        jumpTo(2);
        jumpTo(0);
    } else {
        var pos = cursor.position()
        textBuf.deleteLine(pos.line)

        if (pos.line == textBuf.length()) {
            cursor.decrementLine()
        }
        // place cursor
        cursor.setChar(Math.min(textBuf.lineLength(cursor.getLine()), cursor.getChar()))
    }
}

// ===========
// Deprecated

// return the amount of characters in one line
// function getCharCount(mat, line){
// 	var charCount = 0;
// 	var len = mat.dim[0];
// 	for (var i = 0; i < len; i++){
// 		if (mat.getcell(i, line) < 32){
// 			return charCount;
// 		}
// 		charCount++;
// 	}
// }

// set an array of amount of characters per line
// function countChars(){
// 	var lines = textBuf.length;
// 	lineLengths = [];
// 	for (var l=0; l<lines; l++){
// 		lineLengths[l] = textBuf[l].length;
// 	}
// }
// ===========