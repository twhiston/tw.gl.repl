//Written in archaic JS for max, so no nice of loops or ESM etc.
var bbf = require("./textFormatters/braceBalancedFormatter")
var wf = require("./textFormatters/whitespaceFormatter")

// arrays for strings;
var textBuf;
//executed in order they are in the array
var formatters = [wf, bbf];

exports.clear = function () {
    textBuf = [''];
}

exports.get = function () {
    return textBuf;
}

exports.getLine = function (line) {
    return textBuf[line];
}

exports.set = function (strArr) {
    textBuf = [];
    textBuf = Array.isArray(strArr) ? strArr : [strArr];
}

exports.setLine = function (line, str) {
    textBuf[line] = str;
}

exports.append = function (strArr) {
    strArr = Array.isArray(strArr) ? strArr : [strArr];

    if (textBuf.length + strArr.length > EDITOR_LINES) {
        post('append(): maximum number of lines reached \n');
        return;
    }
    textBuf = textBuf.concat(strArr);
}

exports.prepend = function (strArr) {
    strArr = Array.isArray(strArr) ? strArr : [strArr];
    if (textBuf.length + strArr.length > EDITOR_LINES) {
        post('prepend(): maximum number of lines reached \n');
        return;
    }
    textBuf = strArr.concat(textBuf);
}

exports.emptyLine = function (line) {
    textBuf[line] = '';
}

function length() {
    return textBuf.length
}
exports.length = length
exports.lines = length

exports.lineLength = function (line) {
    return textBuf[line].length
}

exports.format = function (strict = false) {
    var formatted = textBuf;
    for (var i = 0; i < formatters.length; i++) {
        formatted = formatters.format(strict);
    }
    return formatted;
}

exports.insertCharAt = function (line, i, c) {
    textBuf[line] = textBuf[line].insertCharAt(i, c);
}

exports.removeCharAt = function (line, i) {
    textBuf[line] = textBuf[line].removeCharAt(i);
}

exports.removeLine = function (line) {
    // add current line to line above
    textBuf[line - 1] += textBuf[line];
    // remove item from array at index
    textBuf.splice(line, 1);
}

exports.deleteLine = function (line) {
    textBuf.splice(line, 1);
}

// remove a charachter at index
String.prototype.removeCharAt = function (i) {
    var tmp = this.split('');
    tmp.splice(i, 1);
    return tmp.join('');
}

// instert a character at index
String.prototype.insertCharAt = function (i, c) {
    var l = this.slice(0, i);
    var r = this.slice(i);
    return l + c + r;
}