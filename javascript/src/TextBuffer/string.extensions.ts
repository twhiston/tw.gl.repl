interface String {
    removeCharAt(i: number): string;
    insertCharAt(i: number, c: string): string;
}

String.prototype.removeCharAt = function (i: number) {
    const tmp = this.split('');
    tmp.splice(i, 1);
    return tmp.join('');
};

String.prototype.insertCharAt = function (i: number, c: string) {
    const l = this.slice(0, i);
    const r = this.slice(i);
    return l + c + r;
};