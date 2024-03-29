import { TextBuffer } from "TextBuffer";
import { Cursor } from "Cursor";
import { KeypressProcessor, KeyProcessor } from 'KeypressProcessor';
import { maxMspBinding } from 'MaxBindings';
import { TextFormatter } from "TextFormatter";
import 'array.extensions';
import 'object.extensions';

//DEFAULT SETTINGS
// INDENTATION = 4;
// EDITOR_LINES = 30;
// CMNT = "//";
export class REPLSettings {
    INDENTATION: number
    CMNT: string
    CMNT_CHARS = []
    constructor(bufferSize: number = 30, indentation: number = 4) {
        this.INDENTATION = indentation
        this.CMNT = "//"
        this.cmntToChars()
    }
    updateWith(instance: REPLSettings): void {
        this.INDENTATION = instance.INDENTATION !== this.INDENTATION ? instance.INDENTATION : this.INDENTATION;
        this.CMNT = instance.CMNT !== this.CMNT ? instance.CMNT : this.CMNT;
        this.cmntToChars();
    }
    cmntToChars() {
        this.CMNT_CHARS = [];
        for (var i = 0; i < this.CMNT.length; i++) {
            this.CMNT_CHARS.push(this.CMNT[i].charCodeAt(0));
        }
        this.CMNT_CHARS = this.CMNT_CHARS.concat(32);
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

@maxMspBinding({ instanceName: 'glrepl.manager' })
export class REPLManager {

    tb: TextBuffer
    c: Cursor
    kp: KeypressProcessor
    formatterPreloads: Array<TextFormatter> = []
    config: REPLSettings

    constructor(config?: REPLSettings, functionPreloads?: Array<PreloadIdentifier>, formatterPreloads?: Array<TextFormatter>) {
        this.c = new Cursor()
        this.kp = new KeypressProcessor()
        //apply default settings if none are passed in
        if (config === undefined)
            config = new REPLSettings
        this.config = config
        this.tb = new TextBuffer();

        //set an array of formatters. Note that the text buffer will call them in the order they are listed in the array
        if (formatterPreloads !== undefined) {
            this.formatterPreloads = formatterPreloads;
        }
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
     Manually bound to max in the main binding template
    */
    keyPress(k: number): Array<string> {
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

    /*
     * Replay some text into the repl, passing it through the keyPress function
     * This may or may not insert it into the buffer depending on configuration
     * Manually bound to max in the main binding template
     */
    replay(text: Array<string>): Array<string> {
        let msgs: Array<string> = [];
        for (const k of text) {
            for (var i = 0; i < k.length; i++) {
                var char = k.charCodeAt(i);
                msgs.concat(this.keyPress(char));
            }
            this.newLine()
        }
        return msgs;
    }

    status(): Array<string> {
        var len = this.tb.textBuf.getMaxChar();
        var tbLen = this.tb.length();
        let msg: Array<string> = []
        msg.push(this.msgFormatter("lines", tbLen.toString()))
        msg.push(this.msgFormatter("length", len.toString()))
        return msg;
    }

    //Need to fromSymbol these messages when we output them in max
    msgFormatter(type: string, arg) {
        return type + " " + arg;
    }

    // set the comment characters. bind the comment function to a key combo to use
    @maxMspBinding({ draw: true, functionName: "comment", isMethod: true, isAttribute: true })
    setCommentChars(c: string) {
        this.config.CMNT = c.toString()
        //because we are targeting below EMCA5 we cannot use setters
        //so we need to call this every time we change the comment chars
        this.config.cmntToChars()
    }


    // add multiple spaces to the text (tab)
    addTab() {
        const pos = this.c.position()
        //TODO: why does the original do this?
        // var numSpaces = this.config.INDENTATION - (pos.char % this.config.INDENTATION);
        var numSpaces = this.config.INDENTATION;
        for (var i = 0; i < numSpaces; i++) {
            this.addChar(32);
        }
    }

    // preload a TextFormatter, which can then be referenced from a config file by id
    preloadFormatter(formatter: TextFormatter) {
        this.formatterPreloads.push(formatter);
    }

    /*
     * add a character (alpha-numeric, numeric, special characters)
     * DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
     * All methods marked with this note are usually used by binding
     * to a key rather than calling it directly in code. Binding to a key
     * ensures that the keyPress function array is invoked, which may then
     * write the data to the buffer depending on configuration
     */
    addChar(char: number) {
        if (char === 13 || char === 10) {
            this.newLine();
        } else if (char > 31 && char < 126) {
            this.addCharToBuffer(char);
        }
    }

    // add one or multiple characters as a string. DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
    @maxMspBinding({ draw: true, throws: true, isMethod: true })
    add(c: string) {
        for (var i = 0; i < c.length; i++) {
            var char = c.charCodeAt(i);
            this.addChar(char);
        }
    }


    private addCharToBuffer(k: number) {
        let pos = this.c.position();
        pos = this.c.position();
        // ascii code to string
        let c = String.fromCharCode(k);
        // insert character at index
        this.tb.insertCharAt(pos.line, pos.char, c);
        // increment current character
        this.c.incrementChar();
    }

    // append a line of text or multiple symbols per line. DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
    @maxMspBinding({ draw: true, isMethod: true, useArgsForText: true })
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

    /*
     * prepend a line of text or multiple symbols per line.
     * DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
     */
    @maxMspBinding({ draw: true, isMethod: true, useArgsForText: true })
    prepend(text: Array<string>) {
        this.c.reset();
        for (var i = 0; i < text.length; i++) {
            this.add(text[i]);
            this.newLine();
        }
        this.jumpTo(JumpDirection.TOP);
        this.jumpTo(JumpDirection.EOL);
    }

    /*
     * remove a line of text at a specified index
     * if no idx is provided it will remove the last line of the buffer.
     */
    @maxMspBinding({ draw: true, isMethod: true })
    remove(idx: number = -1) {
        if (idx === -1) { idx = this.tb.length() - 1; }
        this.c.setLine(idx);
        this.deleteLine();
    }

    /*
    * insert a line of text or multiple symbols at a specified index
    * a list of symbols will insert one line per symbol
    * DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
    */
    @maxMspBinding({ draw: true, throws: true, isMethod: true, useArgsForText: true })
    insert(idx: number, text: Array<string>) {
        // if insert between totalLines
        if (idx < this.tb.length()) {
            var u = this.tb.textBuf.slice(0, Math.max(0, idx));
            u = Array.isArray(u) ? u : [u];
            u = u.concat(text);
            this.tb.set(u.concat(this.tb.textBuf.slice(idx)))
        } else {
            // else append to code and insert empty strings
            var diff = idx - this.tb.length();
            for (var d = 0; d < diff; d++) {
                this.tb.textBuf.push('');
            }
            this.tb.set(this.tb.textBuf.concat(text))
        }
    }

    /*
    * replace all the text with the incoming arguments
    * this can be a list of symbols for every line
    * DOES NOT PROCESS KEYPRESSES, WRITES DIRECTLY TO BUFFER
    */
    @maxMspBinding({ draw: true, isMethod: true, useArgsForText: true })
    set(text: Array<string>) {

        text = (text.length < 1) ? [''] : text;
        text = (!Array.isArray(text)) ? [text] : text;

        text = text.slice(0, text.length);
        // empty buffer
        this.tb.set(text);

        this.c.setLine(this.tb.length() - 1)
        this.jumpTo(JumpDirection.END);
        this.jumpTo(JumpDirection.EOL);
    }


    // backspace a character
    @maxMspBinding({ functionName: 'back', draw: true, isMethod: true })
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
    @maxMspBinding({ draw: true, isMethod: true })
    clear() {
        this.c.reset()
        this.tb.clear();
    }

    // delete the character in front of the cursor
    @maxMspBinding({ functionName: 'del', draw: true, isMethod: true })
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
    @maxMspBinding({ draw: true, isMethod: true })
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
    @maxMspBinding({ draw: true, isMethod: true })
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
    @maxMspBinding({ draw: true, isMethod: true })
    gotoIndex(idx: number): void {
        // go to beginning if index less then 0
        if (idx < 0) {
            this.jumpTo(0);
            this.jumpTo(2);
            return;
        }
        // else move to the index by checking every line length
        for (var l = 0; l < this.tb.length(); l++) {
            if (idx < this.tb.lineLength(l)) {
                this.c.setLine(l)
                this.c.setChar(idx)
                return;
            } else {
                // curLine = l;
                // curChar = textBuf[l].length;
                idx -= this.tb.lineLength(l);
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

    //kp load also throws!
    loadConfigFromJSON(dictstring: string) {
        const json = JSON.parse(dictstring);

        if (json.settings?.repl ?? false) {
            let newSettings = new REPLSettings()
            Object.assign(newSettings, json.settings.repl);
            this.config.updateWith(newSettings);
        }

        let newTB = new TextBuffer();
        if (json.settings?.textbuffer?.formatters ?? false) {
            for (const formatter of json.settings.textbuffer.formatters) {
                var result = this.formatterPreloads.filter(obj => {
                    return obj.id === formatter
                })
                if (result !== undefined) {
                    for (const f of result) {
                        newTB.addFormatter(f)
                    }
                }
            }
        }

        this.tb = newTB;

        this.kp.loadConfigFromJSON(dictstring)
    }

}