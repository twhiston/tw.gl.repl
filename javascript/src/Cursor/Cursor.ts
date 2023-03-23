export interface CursorPosition {
    line: number;
    char: number;
}

export class Cursor {
    private pos: CursorPosition;

    constructor() {
        this.pos = { line: 0, char: 0 }
    }

    reset() {
        this.pos.char = 0;
        this.pos.line = 0;
    }

    resetChar() {
        this.pos.char = 0;
    }

    resetLine() {
        this.pos.line = 0;
    }

    position(): CursorPosition {
        return this.pos;
    }

    line(): number {
        return this.pos.line;
    }

    char(): number {
        return this.pos.char;
    }

    incrementChar(): number {
        return this.pos.char++;
    }

    decrementChar(): number {
        //TODO: is there a good reason this was -1 and not 0 originally?
        this.pos.char = Math.max(0, (this.pos.char -= 1));
        return this.pos.char;
    }

    incrementLine(): number {
        return this.pos.line++;
    }

    decrementLine(): number {
        //TODO: is there a good reason this was -1 and not 0 originally?
        this.pos.line = Math.max(0, (this.pos.line -= 1));
        return this.pos.line;
    }

    setChar(pos: number): void {
        this.pos.char = pos;
    }

    setLine(pos: number): void {
        this.pos.line = pos;
    }
}