
import { TextFormatter } from 'TextFormatter';

export class CommentRemoverFormatter implements TextFormatter {
    readonly id: string = "commentremover"
    readonly joiner: string
    //single line output.
    format(strArr: Array<string>) {
        return strArr.filter(e => !e.startsWith('//'));
    }

}

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function (search, rawPos) {
            var pos = rawPos > 0 ? rawPos | 0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}