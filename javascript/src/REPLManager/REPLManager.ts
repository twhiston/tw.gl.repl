import { TextBuffer } from "TextBuffer";
import { Cursor } from "Cursor";
import { KeypressProcessor, KeyProcessor } from 'KeypressProcessor';
import { maxMspBinding } from 'MaxBindings';
import { TextFormatter } from "TextFormatter";

//DEFAULT SETTINGS
// MAX_CHARS = 80;
// INDENTATION = 4;
// EDITOR_LINES = 30;
// CMNT = "//";

export class REPLSettings {
    MAX_CHARS: number
    INDENTATION: number
    BUFFER_SIZE: number
    CMNT: string;
    //TODO: Do we need this?
    CMNT_CHARS = [];
    constructor(editorLines: number = 30, maxChars: number = 80, indentation: number = 4) {
        this.INDENTATION = indentation
        this.MAX_CHARS = maxChars
        this.BUFFER_SIZE = editorLines
        this.CMNT = "//"
    }
}

//We use this externally so we have a type we can use to ensure we get both an id and a function when preloading
export interface PreloadIdentifier {
    id: string
    func: KeyProcessor
}

export type Direction = 1 | -1;

export enum JumpDirection {
    // beginning of line
    BOL,
    // end of line
    EOL,
    // top of text array
    TOP,
    //bottom of text array
    END
}

@maxMspBinding({ instanceName: 'i.repl' })
export class REPLManager {

    tb: TextBuffer
    c: Cursor
    kp: KeypressProcessor
    config: REPLSettings

    //TODO: remove buffSize as unused now
    constructor(config?: REPLSettings, functionPreloads?: Array<PreloadIdentifier>, bufferFormatters?: Array<TextFormatter>) {
        this.c = new Cursor()
        this.kp = new KeypressProcessor()
        //apply default settings if none are passed in
        if (config === undefined)
            config = new REPLSettings
        this.config = config
        this.tb = new TextBuffer(this.config.BUFFER_SIZE);

        //set an array of formatters. Note that the text buffer will call them in the order they are listed in the array
        if (bufferFormatters !== undefined)
            this.tb.setFormatters(Array.isArray(bufferFormatters) ? bufferFormatters : [bufferFormatters])
        //preload any functions that we want users to be able to refer to in json config files
        if (functionPreloads !== undefined) {
            //functionPreloads = Array.isArray(functionPreloads) ? functionPreloads : [functionPreloads]
            for (const func of functionPreloads) {
                this.kp.preloadFunction(func.id, func.func);
            }
        }
        this.setCommentChars(this.config.CMNT);
    }

    /*
     process a keypress
     This needs more around it so it's not a simple bind
     if a function which is called throws it is expected that
     it should return some info about why in the error, which will
     be output with the word error prepended as a msg
    */
    keyPress(k: number) {
        const res = this.kp.processKeypress(k)
        let msgs: Array<string> = [];
        for (const func of res) {
            try {
                let msg = func(k, this)
                if (msg !== "" && msg !== undefined) {
                    msgs.push(...msg);
                }
            } catch (error) {
                msgs.push("error " + error.message)
            }
        }
        return msgs;
    }

    status(): Array<string> {
        var len = this.tb.getMaxChar();
        var tbLen = this.tb.length();
        let msg: Array<string> = []
        msg.push(this.msgFormatter("lines", tbLen.toString()))
        msg.push(this.msgFormatter("line", this.tb.getLine(this.c.line())))
        msg.push(this.msgFormatter("length", len.toString()))
        msg.push(this.msgFormatter("nLength", (len / this.config.MAX_CHARS).toString()))
        msg.push(this.msgFormatter("nLines", ((tbLen - 1) / (this.config.BUFFER_SIZE - 1)).toString()))
        return msg;
    }

    //Need to fromSymbol these messages when we output them in max
    msgFormatter(type: string, arg) {
        return type + " " + arg;
    }

    // set the comment characters. bind the comment function to a key combo to use
    @maxMspBinding({ draw: true, functionName: "comment" })
    setCommentChars(c) {
        this.config.CMNT = c.toString();
        this.config.CMNT_CHARS = [];
        for (var i = 0; i < this.config.CMNT.length; i++) {
            this.config.CMNT_CHARS.push(this.config.CMNT[i].charCodeAt(0));
        }
        this.config.CMNT_CHARS = this.config.CMNT_CHARS.concat(32);
    }


    // add multiple spaces to the text (tab)
    @maxMspBinding({ draw: true, throws: true })
    addTab() {
        const pos = this.c.position()
        //TODO: why does the original do this?
        // var numSpaces = this.config.INDENTATION - (pos.char % this.config.INDENTATION);
        var numSpaces = this.config.INDENTATION;
        for (var i = 0; i < numSpaces; i++) {
            this.addChar(32);
        }
    }

    // add a character (alpha-numeric, numeric, special characters)
    addChar(k: number) {
        var pos = this.c.position();
        if (pos.char >= this.config.MAX_CHARS) {
            if (this.tb.endOfLines()) {
                throw new Error("reached end of lines");
            } else {
                this.newLine();
            }
        }
        // ascii code to string
        var c = String.fromCharCode(k);
        // insert character at index
        this.tb.insertCharAt(pos.line, pos.char, c);
        // increment current character
        this.c.incrementChar();
    }

    // add one or multiple characters as a string
    @maxMspBinding({ draw: true, throws: true })
    add(c: string) {
        for (var i = 0; i < c.length; i++) {
            var char = c.charCodeAt(i);
            if (char === 13 || char === 10) {
                this.newLine();
            } else if (char > 31 && char < 126) {
                this.addChar(char);
            }
        }
    }

    // append a line of text or multiple symbols per line
    @maxMspBinding({ draw: true })
    append(text: Array<string>) {
        if (text.length > 0)
            this.newLine();
        for (var i = 0; i < text.length; i++) {
            this.add(text[i]);
            if (i < text.length - 1)
                this.newLine();
        }
        this.jumpTo(JumpDirection.TOP);
        this.jumpTo(JumpDirection.EOL);
    }

    // prepend a line of text or multiple symbols per line
    @maxMspBinding({ draw: true })
    prepend(text: Array<string>) {
        this.c.reset();
        for (var i = 0; i < text.length; i++) {
            this.add(text[i]);
            this.newLine();
        }
        this.jumpTo(JumpDirection.TOP);
        this.jumpTo(JumpDirection.EOL);
    }

    /* remove a line of text at a specified index
    * if no idx is provided it will remove the last line of the buffer.
    */
    @maxMspBinding({ draw: true })
    remove(idx: number = -1) {
        if (idx === -1) { idx = this.tb.length() - 1; }
        this.c.setLine(idx);
        this.deleteLine();
    }

    /* insert a line of text or multiple symbols at a specified index
    * a list of symbols will insert one line per symbol
    * NOTE THAT INSERT WILL NOT PROCESS THE INPUT!
    * So you can use this to insert text which you do not 
    * want to be processed for some reason
    */
    @maxMspBinding({ draw: true, throws: true })
    insert(idx: number, text: Array<string>) {
        var idx = Math.min(this.config.BUFFER_SIZE, idx);

        // exit if doesn't fit in editor
        const iSize = this.tb.lines() + text.length;
        if (this.tb.lines() + text.length > this.config.BUFFER_SIZE) {
            throw new Error('too many lines')
        }
        // if insert between totalLines
        if (idx < this.tb.lines()) {
            var u = this.tb.textBuf.slice(0, Math.max(0, idx));
            u = Array.isArray(u) ? u : [u];
            u = u.concat(text);
            this.tb.set(u.concat(this.tb.textBuf.slice(idx)))
        } else {
            // else append to code and insert empty strings
            var diff = idx - this.tb.lines();
            for (var d = 0; d < diff; d++) {
                this.tb.textBuf.push('');
            }
            this.tb.set(this.tb.textBuf.concat(text))
        }
    }

    /*
    * replace all the text with the incoming arguments
    * this can be a list of symbols for every line
    * NOTE THAT INSERT WILL NOT PROCESS THE INPUT!
    */
    @maxMspBinding({ draw: true })
    set(text: Array<string>) {

        text = (text.length < 1) ? [''] : text;
        text = (!Array.isArray(text)) ? [text] : text;

        var inputLines = Math.min(this.config.BUFFER_SIZE, text.length);
        text = text.slice(0, inputLines);
        // empty buffer
        this.tb.set(text);

        this.c.setLine(this.tb.length() - 1)
        this.jumpTo(JumpDirection.END);
        this.jumpTo(JumpDirection.EOL);
    }


    // backspace a character
    @maxMspBinding({ functionName: 'back', draw: true })
    backSpace() {
        // decrement character index
        this.c.decrementChar()

        var pos = this.c.position()
        if (pos.char >= 0) {
            // remove character at index
            this.tb.removeCharAt(pos.line, pos.char);
        } else if (pos.line > 0) {
            // remove line if at beginning of line
            this.spliceLine();
        } else {
            // else index is 0
            this.c.resetChar();
        }
    }

    //reset the cursor and empty the buffer
    @maxMspBinding({ draw: true })
    clear() {
        this.c.reset()
        this.tb.clear();
    }

    // delete the character in front of the cursor
    @maxMspBinding({ functionName: 'del', draw: true })
    deleteChar() {
        var pos = this.c.position()
        if (pos.char < this.tb.lineLength(pos.line)) {
            this.tb.setLine(pos.line, this.tb.getLine(pos.line).removeCharAt(pos.char))
        } else {
            if (pos.line < this.tb.length() - 1) {
                this.jumpLine(1 as Direction);
                this.spliceLine();
            }
        }
    }

    formatPasteBin(): string[] {
        return this.tb.pasteBinFormat();
    }

    // move one character to the right or left
    //NB used to be called gotoCharacter
    jumpChar(dir: Direction) {

        // if (dir !== -1 && dir !== 1) {
        //     throw new Error('gotoCharacter direction out of bounds: ' + dir);
        // }
        var pos = this.c.position()
        this.c.setChar(pos.char + dir);
        pos = this.c.position()
        var len = this.tb.lineLength(pos.line);

        if (pos.char < 0 && pos.line > 0) {
            this.jumpLine(-1);
            this.jumpTo(1);
        } else if (pos.char > len && pos.line != this.tb.length() - 1) {
            this.jumpLine(1);
            this.jumpTo(0);
        } else {
            this.c.setChar(Math.min(len, Math.max(0, pos.char)))
        }
    }

    // move one line up or down
    //NB used to be called gotoLine
    jumpLine(k: Direction) {
        var pos = this.c.position()
        //k = k * 2 - 1;
        var prevLen = this.tb.lineLength(pos.line);

        this.c.setLine(Math.min(Math.max(0, (pos.line + k)), this.tb.length() - 1))
        pos = this.c.position()
        var len = this.tb.lineLength(pos.line);

        if (pos.char == prevLen) {
            this.c.setChar(len);
        } else {
            this.c.setChar(Math.min(len, pos.char));
        }
    }

    // jump to the next or previous word (looks for seprated by spaces)
    //NB used to be called gotoWord
    jumpWord(k: Direction) {
        var pos = this.c.position()
        if (k === -1) {
            var l = this.tb.getLine(pos.line).slice(0, pos.char);
            if (l.match(/\ +[^ ]*$/g)) {
                const match = l.match(/\s+[^\s]*(\s?)+$/g)
                if (match !== null) {
                    var move = match[0].length;
                    this.c.setChar(pos.char - move);
                }
            } else {
                this.jumpTo(0);
                this.jumpChar(-1);
            }
        } else if (k === 1) {
            var l = this.tb.getLine(pos.line).slice(pos.char);
            if (l.match(/^[^ ]*\ +/g)) {
                const match = l.match(/\s+[^\s]*(\s?)+$/g)
                if (match !== null) {
                    var move = match[0].length;
                    this.c.setChar(pos.char + move);
                }
            } else {
                this.jumpTo(1);
                this.jumpChar(1);
            }
        }
    }

    // jump to beginning/end of line or top/bottom of the tb string array
    jumpTo(k: JumpDirection): void {
        var pos = this.c.position()
        var len = this.tb.lineLength(pos.line);
        switch (k) {
            // beginning of line
            case JumpDirection.BOL: this.c.setChar(0); break;
            // end of line
            case JumpDirection.EOL: this.c.setChar(len); break;
            // to beginning (top)
            case JumpDirection.TOP:
                this.c.setLine(0);
                len = this.tb.lineLength(0);
                //TODO: test this logic!
                this.c.setChar(Math.min(len, pos.char))
                break;
            // to end (bottom)
            case JumpDirection.END:
                this.c.setLine(this.tb.length() - 1);
                len = this.tb.lineLength(this.c.line());
                this.c.setChar(Math.min(len, pos.char))
                break;
        }
    }

    // move the cursor to the index of the letter in the full text
    @maxMspBinding({ draw: true })
    gotoIndex(i: number): void {
        // go to beginning if index less then 0
        if (i < 0) {
            this.jumpTo(0);
            this.jumpTo(2);
            return;
        }
        // else move to the index by checking every line length
        for (var l = 0; l < this.tb.length(); l++) {
            if (i < this.tb.lineLength(l)) {
                this.c.setLine(l)
                this.c.setChar(i)
                return;
            } else {
                // curLine = l;
                // curChar = textBuf[l].length;
                i -= this.tb.lineLength(l);
            }
        }
        // else jump to end if index greater than max length;
        this.jumpTo(3);
        this.jumpTo(1);
    }

    newLine(): void {
        if (this.tb.endOfLines()) {
            throw new Error('End of lines reached, cannot create new line');
        }
        // split array in left and right of cursor
        var pos = this.c.position();
        var line = this.tb.getLine(pos.line);
        var l = line.slice(0, pos.char);
        var r = line.slice(pos.char);

        // store line left on current line
        this.tb.setLine(pos.line, l);

        // update the line position
        pos.line = this.c.incrementLine();

        // insert new line on right side of cursor
        var u = this.tb.get().slice(0, pos.line);
        u = Array.isArray(u) ? u : [u];
        u.push(r);
        // store to text buffer
        this.tb.set(u.concat(this.tb.get().slice(pos.line)));
        // jump to beginning of line
        this.jumpTo(JumpDirection.BOL);
    }

    //NB: This used to be called removeLine
    spliceLine(): void {
        // cursors at end of previous line
        const line = this.c.line()
        this.c.setChar(this.tb.lineLength(line - 1))

        this.tb.spliceLine(line)

        // update the line position
        this.c.setLine(Math.max(0, line - 1));
    }

    deleteLine(): void {
        if (this.tb.length() == 1) {
            this.tb.clear();
            this.c.setLine(0);
            this.jumpTo(JumpDirection.TOP);
            this.jumpTo(JumpDirection.BOL);
        } else {
            this.tb.deleteLine(this.c.line())

            if (this.c.line() == this.tb.length()) {
                this.c.decrementLine()
            }
            // place cursor
            this.c.setChar(Math.max(this.tb.lineLength(this.c.line()), this.c.char()))
        }
    }

    // Add or remove comment at start of line
    commentLine() {
        // add comment-characters to regex
        // escape special characters
        var esc = this.config.CMNT.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        var rgx = new RegExp('^ *' + esc + ' ?', 'g');
        // if has comment remove it, else add
        let cLine = this.c.line();
        if (this.tb.getLine(cLine).match(rgx)) {
            this.tb.setLine(cLine, this.tb.getLine(cLine).replace(rgx, ''));
        } else {
            this.tb.setLine(cLine, this.config.CMNT + ' ' + this.tb.getLine(cLine));
        }
        this.c.setChar(this.tb.lineLength(this.c.line()));
    }

}