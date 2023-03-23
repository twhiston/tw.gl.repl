//import '../string.extensions';
import '../TextFormatter';

export class WhitespaceFormatter implements TextFormatter {
    //replaces all forms of whitespace with a space and trims the end
    format(strArr: Array<string>, ctx?: {}) {
        var out = strArr.map(function (t) {
            return t.replace(/\s+/g, ' ').trim();
        })
        return out;
    }

}