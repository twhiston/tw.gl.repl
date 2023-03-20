// global pastebin variable to store a line of text
var pasteBin;

function copyLine(strArr, line) {
    pasteBin = strArr[line];
    return pasteBin;
}
function copyAll() {
    var outBuf = [];
    for (var i = 0; i < textBuf.length(); i++) {
        outBuf[i] = textBuf[i].trim()
    }
    //TODO: make work with pasteBin to paste all back in without external commands
    outlet(2, outBuf.join('\\\n'));
}

function pasteReplaceLine() {
    if (pasteBin !== null) {
        // replace string with pastebin string
        textBuf[curLine] = pasteBin;
        // jump to end of new line
        jumpTo(1);
    }
}

function pasteInsertLine() {
    if (!endOfLines()) {
        jumpTo(0);
        newLine();
        gotoLine(0);
        return pasteReplaceLine();
    }
}

function endOfLines() {
    var isEnd = textBuf.length() >= EDITOR_LINES;
    if (isEnd) {
        post("WARNING: End of lines reached \n");
    }
    return isEnd;
}