class TextBuffer {
    constructor(maxLines) {
        this.maxLines = maxLines;
        this.textBuf = [''];
        this.formatters = [];
    }

    clear() {
        this.textBuf = [''];
    }

    get() {
        return this.textBuf;
    }

    getLine(line) {
        return this.textBuf[line];
    }

    set(strArr) {
        this.textBuf = [];
        this.textBuf = Array.isArray(strArr) ? strArr : [strArr];
    }

    setLine(line, str) {
        this.textBuf[line] = str;
    }

    append(strArr) {
        strArr = Array.isArray(strArr) ? strArr : [strArr];

        if (this.textBuf.length + strArr.length > this.maxLines) {
            console.log('append(): maximum number of lines reached \n');
            return;
        }

        this.textBuf = this.textBuf.concat(strArr);
    }

    prepend(strArr) {
        strArr = Array.isArray(strArr) ? strArr : [strArr];

        if (this.textBuf.length + strArr.length > this.maxLines) {
            console.log('prepend(): maximum number of lines reached \n');
            return;
        }

        this.textBuf = strArr.concat(this.textBuf);
    }

    emptyLine(line) {
        this.textBuf[line] = '';
    }

    //TODO: get rid of one of these 2
    length() {
        return this.textBuf.length;
    }

    lines() {
        return this.length();
    }

    lineLength(line) {
        return this.textBuf[line].length;
    }

    addFormatter(formatter) {
        this.formatters.push(formatter);
    }

    setFormatters(formatters) {
        this.formatters = formatters;
    }

    format(ctx = {}) {
        let formatted = this.textBuf;
        for (let i = 0; i < this.formatters.length; i++) {
            formatted = this.formatters[i](formatted, ctx);
        }
        return formatted;
    }

    insertCharAt(line, i, c) {
        this.textBuf[line] = this.textBuf[line].insertCharAt(i, c);
    }

    removeCharAt(line, i) {
        this.textBuf[line] = this.textBuf[line].removeCharAt(i);
    }

    spliceLine(line) {
        if (line > 0) {
            // add current line to line above
            this.textBuf[line - 1] += this.textBuf[line];
        }
        // remove item from array at index
        this.textBuf.splice(line, 1);
    }

    deleteLine(line) {
        this.textBuf.splice(line, 1);
    }
}

String.prototype.removeCharAt = function (i) {
    const tmp = this.split('');
    tmp.splice(i, 1);
    return tmp.join('');
};

String.prototype.insertCharAt = function (i, c) {
    const l = this.slice(0, i);
    const r = this.slice(i);
    return l + c + r;
};

module.exports = TextBuffer;
