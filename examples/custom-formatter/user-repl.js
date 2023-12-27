"use strict";
/**
 * This example user-repl defines two formatters in pure javascript and
 * adds them to the repl so that we can activate them in the config file
 */
var ConstrainToMidiNumbers = /** @class */ (function () {
    function ConstrainToMidiNumbers() {
        this.id = "constrainToMidiNumbers";
    }
    ConstrainToMidiNumbers.prototype.format = function (strArr) {
        function isNumeric(str) {
            return !isNaN(parseFloat(str)) && isFinite(str);
        }

        function constrain(num, min, max) {
            return Math.min(Math.max(num, min), max);
        }

        var constrainedLines = [];
        var prevMessage = [null, null, null];
        var numCount = 0;

        strArr.forEach(function (line) {
            var prefix = "";
            var tokens = line.split(' ');
            var constrainedLine = [];
            var message = [null, null, null];

            tokens.forEach(function (token, index) {
                if (isNumeric(token)) {
                    numCount++;

                    if (numCount === 3) {
                        message[numCount - 1] = token;
                    } else {
                        var constrainedNumber = constrain(parseInt(token, 10), 0, 127);
                        message[numCount - 1] = constrainedNumber.toString();
                    }
                } else {
                    numCount = 0;
                    prefix = token;
                }
            });

            if (constrainedLines.length === 0 && (message[1] === null || message[2] === null)) {
                throw new Error("The first message must have three elements.");
            }

            for (var i = 0; i < 3; i++) {
                if (message[i] === null) {
                    message[i] = prevMessage[i];
                }
            }

            prevMessage = message;
            constrainedLine = prefix + " " + message.join(' ');
            constrainedLines.push(constrainedLine);
        });

        return constrainedLines;
    }
    return ConstrainToMidiNumbers;
}());


// Polyfill for Array.prototype.find
// max is so archaic you're going to need a lot of polyfills if you like modern js!
// This makes the below snippet expander a lot easier to write compared to using filter
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);
        var len = o.length >>> 0;

        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }

        var thisArg = arguments[1];
        var k = 0;

        while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
            }
            k++;
        }

        return undefined;
    };
}


var SnippetExpander = /** @class */ (function () {
    function SnippetExpander() {
        this.id = "snippetExpander";
        this.spacer = " ";
        this.snips = [
            {
                input: "n",
                output: "note",
            }
        ];
    }

    SnippetExpander.prototype.format = function (strArr) {
        var self = this;
        var formattedLines = [];
        var formattedLine = '';

        strArr.forEach(function (line) {
            var words = line.split(' ');

            words.forEach(function (word, index) {
                var matchingSnip = self.snips.find(function (snip) {
                    return snip.input === word;
                });

                if (matchingSnip) {
                    if (formattedLine.length > 0) {
                        formattedLines.push(formattedLine.trim());
                        formattedLine = '';
                    }
                    formattedLine += matchingSnip.output + self.spacer;
                } else {
                    formattedLine += word;
                    if (index !== words.length - 1) {
                        formattedLine += self.spacer;
                    }
                }
            });

            if (formattedLine.length > 0) {
                formattedLines.push(formattedLine.trim());
                formattedLine = '';
            }
        });

        return formattedLines;
    };
    return SnippetExpander;
}());

var ctmn = new ConstrainToMidiNumbers()
var se = new SnippetExpander()
glrepl.manager.preloadFormatter(ctmn)
glrepl.manager.preloadFormatter(se)