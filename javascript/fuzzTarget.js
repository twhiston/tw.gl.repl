const bb = require("./braceBalancedFormatter.js");

function fuzz(buf) {

    try {
        let output = bb.braceBalancedFormatter(buf, true)
        output.forEach(element => {
            if(!bb.isBalanced(element)){
                throw new Error('Not Balanced');
            }
        });
    } catch (e) {
        // Those are "valid" exceptions.
        if (e.message.indexOf('Not Balanced') !== -1) {
        } else {
            throw e;
        }
    }
}
  module.exports = {
      fuzz
  };