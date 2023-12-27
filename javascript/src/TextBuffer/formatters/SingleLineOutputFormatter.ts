import { TextFormatter } from 'TextFormatter';

export class SingleLineOutputFormatter implements TextFormatter {
    readonly id: string = "singleline"
    readonly joiner: string
    constructor(join: string = " ") {
        this.joiner = join
    }
    //single line output.
    format(strArr: Array<string>) {
        return [strArr.join(this.joiner)];
    }

}