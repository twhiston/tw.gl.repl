String.prototype.replacerec = function (pattern, what) {
  var newstr = this.replace(pattern, what);
  if (newstr == this)
      return newstr;
  return newstr.replace(pattern, what);
};


exports.format = function (strArr, strict) {

  const reg = /([([])\s+|\s+([)\]])/g
  var balanced = true;
  var history = ""
  var output = [];

  //max msp javascript is fucking archaic!
  for (var i = 0; i < strArr.length; i++) { 
  //for (var v of strArr) {
    var v = strArr[i];
    
    var data = history + v + " ";
    balanced = isBalanced(data)
    if (!balanced) {
      history = data;
    } else {
      
      const bracketSpaceFixed = data.replacerec(reg, "$1$2");
      output.push(bracketSpaceFixed.trim())
      history = "";
    }
  }

  if (strict && !balanced) {
    throw new Error("not balanced: " + history.trim())
  }
  return output;

};

//https://levelup.gitconnected.com/solving-balanced-brackets-in-javascript-with-stacks-edbc52a57309
function isBalanced(input) {

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
};
exports.isBalanced = isBalanced;