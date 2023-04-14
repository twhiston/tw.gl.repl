//import '../string.extensions';
import { TextFormatter } from 'TextFormatter';

export class SingleLineOutputFormatter implements TextFormatter {
    readonly id: string = "singleline"
    constructor() { }
    //single line output.
    format(strArr: Array<string>) {
        return [strArr.join(' ')];
    }

}