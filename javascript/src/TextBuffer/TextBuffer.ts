import 'string.extensions';
import { TextFormatter } from 'TextFormatter';

export class TextBuffer {
    maxLines: number
    textBuf: Array<string>
    formatters: Array<TextFormatter>
    pasteBin: Array<string>

    constructor(maxLines: number) {
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

    getLine(line: number): string {
        return this.textBuf[line];
    }

    set(strArr: Array<string>): void {
        this.textBuf = strArr;
    }

    setLine(line: number, str: string): void {
        this.textBuf[line] = str;
    }

    append(strArr: Array<string>): void {
        if (this.textBuf.length + strArr.length > this.maxLines) {
            console.log('append: maximum number of lines reached \n');
            return;
        }
        this.textBuf = this.textBuf.concat(strArr);
    }

    prepend(strArr: Array<string>): void {
        if (this.textBuf.length + strArr.length > this.maxLines) {
            console.log('prepend: maximum number of lines reached \n');
            return;
        }
        this.textBuf = strArr.concat(this.textBuf);
    }

    emptyLine(line: number): void {
        this.textBuf[line] = '';
    }

    //TODO: get rid of one of these 2
    length(): number {
        return this.textBuf.length;
    }

    lines() {
        return this.length();
    }

    lineLength(line: number): number {
        return this.textBuf[line].length;
    }

    addFormatter(formatter: TextFormatter): void {
        this.formatters.push(formatter);
    }

    setFormatters(formatters: Array<TextFormatter>): void {
        this.formatters = formatters;
    }

    format(ctx = {}): Array<string> {
        let formatted = this.textBuf;
        for (let i = 0; i < this.formatters.length; i++) {
            formatted = this.formatters[i].format(formatted, ctx);
        }
        return formatted;
    }

    insertCharAt(line: number, i: number, c: string): void {
        this.textBuf[line] = this.textBuf[line].insertCharAt(i, c);
    }

    removeCharAt(line: number, i: number): void {
        this.textBuf[line] = this.textBuf[line].removeCharAt(i);
    }

    spliceLine(line: number): void {
        if (line > 0) {
            // add current line to line above
            this.textBuf[line - 1] += this.textBuf[line];
        }
        // remove item from array at index
        this.textBuf.splice(line, 1);
    }

    deleteLine(line: number): void {
        this.textBuf.splice(line, 1);
    }

    endOfLines(): boolean {
        return this.textBuf.length >= this.maxLines;
    }

    // return the number of characters in the longest line in the buffer
    getMaxChar(): number {
        var lengths = [];
        for (var l = 0; l < this.textBuf.length; l++) {
            lengths[l] = this.lineLength(l);
        }
        var sortArr = lengths.slice(0);
        sortArr.sort(function (a, b) { return b - a });

        return sortArr[0];
    }

    pasteBinCopyLine(line: number): Array<string> {
        if (line < 0 || line > this.textBuf.length) {
            throw new Error('pastebin line index out of range')
        }
        this.pasteBin = [this.textBuf[line]];
        return this.pasteBin;
    }

    pasteBinCopyAll(): Array<string> {
        this.pasteBin = [];
        for (var i = 0; i < this.textBuf.length; i++) {
            this.pasteBin[i] = this.textBuf[i].trim()
        }
        return this.pasteBin;
    }

    pasteBinGet(): Array<string> {
        return this.pasteBin;
    }

    pasteBinInsertLine(lineIndex: number): void {
        // if (!endOfLines()) {
        //     jumpTo(0);
        //     newLine();
        //     gotoLine(0);
        //     return pasteReplaceLine();
        // }
        // inserts pastebin contents at line index
        this.pasteBinMutateLine(lineIndex, 0)

        // jump to end of new line
        //jumpTo(1);
    }

    pasteBinReplaceLine(lineIndex: number) {
        //replaced a line with pastebin content. could be a multiline insert!
        this.pasteBinMutateLine(lineIndex, lineIndex)
    }

    //Mutate the text buffer by inserting and optionally removing an element from the pasteBin
    pasteBinMutateLine(insertID: number, removeID: number) {
        let catId = [insertID, removeID];
        if (!this.endOfLines() && insertID < this.maxLines && removeID < this.maxLines)
            Array.prototype.splice.apply(this.textBuf, <Parameters<Array<string>['splice']>>[insertID, removeID, ...this.pasteBin]);
        //Array.prototype.splice.apply(this.textBuf, [insertID, removeID].concat(this.pasteBin));
        else
            throw new Error('insert or remove ID out of range: ' + insertID + " " + removeID);
    }
}
