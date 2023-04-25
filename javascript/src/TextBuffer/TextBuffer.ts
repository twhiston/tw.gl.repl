import 'string.extensions';
import 'array.extensions';
import { TextFormatter } from 'TextFormatter';

export class TextBuffer {
    textBuf: Array<string>
    formatters: Array<TextFormatter>
    pasteBin: Array<string>

    constructor() {
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
        return this.textBuf[line] || '';
    }

    set(strArr: Array<string>): void {
        this.textBuf = strArr;
    }

    setLine(line: number, str: string): void {
        this.textBuf[line] = str;
    }

    append(strArr: Array<string>): void {
        this.textBuf = this.textBuf.concat(strArr);
    }

    prepend(strArr: Array<string>): void {
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

    format(): Array<string> {
        return this.formatTextArray(this.textBuf);
    }

    formatLine(lineNum: number): Array<string> {
        return this.formatTextArray([this.getLine(lineNum)]);
    }

    private formatTextArray(textArr: Array<string>): Array<string> {
        let formatted = textArr;
        for (let i = 0; i < this.formatters.length; i++) {
            formatted = this.formatters[i].format(formatted);
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
        if (this.textBuf.length <= 1)
            this.clear();
        else
            this.textBuf.splice(line, 1);
    }

    //TODO: Deprecated
    endOfLines(): boolean {
        return false;
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

    pasteBinFormat(): Array<string> {
        return this.formatTextArray(this.pasteBin);
    }

    pasteBinGet(): Array<string> {
        return this.pasteBin;
    }

    pasteBinInsertLine(lineIndex: number): void {
        this.pasteBinMutateLine(lineIndex, 0)
    }

    pasteBinReplaceLine(lineIndex: number) {
        //replaced a line with pastebin content. could be a multiline insert!
        this.pasteBinMutateLine(lineIndex, lineIndex)
    }

    //Mutate the text buffer by inserting and optionally removing an element from the pasteBin
    pasteBinMutateLine(insertID: number, removeID: number) {
        if (insertID < this.textBuf.length + 1 && removeID < this.textBuf.length + 1)
            Array.prototype.splice.apply(this.textBuf, <Parameters<Array<string>['splice']>>[insertID, removeID, ...this.pasteBin]);
        else
            throw new Error('insert or remove ID out of range: ' + insertID + " " + removeID);
    }

}
