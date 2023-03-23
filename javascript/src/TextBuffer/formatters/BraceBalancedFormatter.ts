import '../string.extensions';
import '../TextFormatter';

export class BraceBalancedFormatter implements TextFormatter {
  format(strArr: Array<string>, ctx?: { strict: boolean }) {

    if (ctx === undefined)
      ctx = { strict: false }

    const reg = /([([])\s+|\s+([)\]])/g
    var balanced = true;
    var history = ""
    var output = [];

    //max msp javascript is fucking archaic!
    for (var i = 0; i < strArr.length; i++) {
      //for (var v of strArr) {
      var v = strArr[i];

      var data = history + v + " ";
      balanced = this.isBalanced(data)
      if (!balanced) {
        history = data;
      } else {

        const bracketSpaceFixed = data.replacerec(reg, "$1$2");
        output.push(bracketSpaceFixed.trim())
        history = "";
      }
    }

    if (ctx.strict && !balanced) {
      throw new Error("not balanced: " + history.trim())
    }
    return output;
  }

  //https://levelup.gitconnected.com/solving-balanced-brackets-in-javascript-with-stacks-edbc52a57309
  isBalanced(input: string) {

    var brackets = "[]{}()<>"
    var stack = []

    for (var i = 0; i < input.length; i++) {
      //for (var bracket of input) {
      var bracket = input[i];
      var bracketsIndex = brackets.indexOf(bracket)

      if (bracketsIndex === -1) {
        continue
      }

      if (bracketsIndex % 2 === 0) {
        stack.push(bracketsIndex + 1)
      } else {
        if (stack.pop() !== bracketsIndex) {
          return false;
        }
      }
    }
    return stack.length === 0
  }
}
