interface String {
    removeCharAt(i: number): string;
    insertCharAt(i: number, c: string): string;
    replacerec(pattern: RegExp, what: string): string;
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

String.prototype.replacerec = function (pattern: RegExp, what: string) {
    var newstr = this.replace(pattern, what);
    if (newstr == this)
        return newstr;
    return newstr.replace(pattern, what);
};