//import '../string.extensions';
import { TextFormatter } from 'TextFormatter';

export class WhitespaceFormatter implements TextFormatter {
    readonly id: string = "whitespace"
    constructor() { }
    //replaces all forms of whitespace with a space and trims the end
    format(strArr: Array<string>) {
        var out = strArr.map(function (t) {
            return t.replace(/\s+/g, ' ').trim();
        })
        return out;
    }

}