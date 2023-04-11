export interface TextFormatter {
    readonly id: string
    format(strArr: Array<string>, ctx?: {}): Array<string>
}