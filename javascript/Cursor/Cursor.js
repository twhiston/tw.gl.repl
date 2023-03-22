class Cursor {
    constructor() {
        this.curLine = 0;
        this.curChar = 0;
    }

    reset() {
        this.curChar = 0;
        this.curLine = 0;
    }

    resetChar() {
        this.curChar = 0;
    }

    resetLine() {
        this.curLine = 0;
    }

    position() {
        return { line: this.curLine, char: this.curChar };
    }

    line() {
        return this.curLine;
    }

    char() {
        return this.curChar;
    }

    incrementChar() {
        return this.curChar++;
    }

    decrementChar() {
        //TODO: is there a good reason this was -1 and not 0 originally?
        this.curChar = Math.max(0, (this.curChar -= 1));
        return this.curChar;
    }

    incrementLine() {
        return this.curLine++;
    }

    decrementLine() {
        //TODO: is there a good reason this was -1 and not 0 originally?
        this.curLine = Math.max(0, (this.curLine -= 1));
        return this.curLine;
    }

    setChar(pos) {
        this.curChar = pos;
    }

    setLine(pos) {
        this.curLine = pos;
    }
}
module.exports = Cursor;