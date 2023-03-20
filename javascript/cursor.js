var curLine = 0;
var curChar = 0;

exports.reset = function () {
    curChar = 0;
    curLine = 0;
}

exports.resetChar = function () {
    curChar = 0;
}

exports.resetLine = function () {
    curLine = 0;
}

exports.position = function () {
    return { line: curLine, char: curChar }
}

exports.line = function () {
    return curLine;
}

exports.char = function () {
    return curChar;
}

exports.incrementChar = function () {
    return curChar++;
}

exports.decrementChar = function () {
    curChar = Math.max(-1, (curChar -= 1));
    return curChar;
}

exports.incrementLine = function () {
    return curLine++;
}

exports.setChar = function (pos) {
    curChar = pos;
}

exports.setLine = function (pos) {
    curLine = pos;
}