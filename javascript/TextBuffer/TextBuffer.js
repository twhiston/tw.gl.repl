class TextBuffer {
    constructor(maxLines) {
        this.maxLines = maxLines;
        this.textBuf = [''];
        this.formatters = [];
        this.pasteBin = [];
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

    endOfLines() {
        return this.textBuf.length >= this.maxLines;
    }

    pasteBinCopyLine(line) {
        if (line < 0 || line > this.textBuf.length) {
            throw new Error('pastebin line index out of range')
        }
        this.pasteBin = [this.textBuf[line]];
        return this.pasteBin;
    }

    pasteBinCopyAll() {
        this.pasteBin = [];
        for (var i = 0; i < this.textBuf.length; i++) {
            this.pasteBin[i] = this.textBuf[i].trim()
        }
        return this.pasteBin;
    }

    pasteBinGet() {
        return this.pasteBin;
    }

    pasteBinInsertLine(lineIndex) {
        // if (!endOfLines()) {
        //     jumpTo(0);
        //     newLine();
        //     gotoLine(0);
        //     return pasteReplaceLine();
        // }
        if (this.pasteBin !== null) {
            // inserts pastebin contents at line index
            this.pasteBinMutateLine(lineIndex, 0)

            // jump to end of new line
            //jumpTo(1);
        }
    }

    pasteBinReplaceLine(lineIndex) {
        //replaced a line with pastebin content. could be a multiline insert!
        this.pasteBinMutateLine(lineIndex, lineIndex)
    }

    //Mutate the text buffer by inserting and optionally removing an element from the pasteBin
    pasteBinMutateLine(insertID, removeID) {
        if (!this.endOfLines() && insertID < this.maxLines && removeID < this.maxLines)
            Array.prototype.splice.apply(this.textBuf, [insertID, removeID].concat(this.pasteBin));
        else
            throw new Error('insert or remove ID out of range @insert @remove', insertID, removeID);
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
