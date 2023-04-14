import { GLRender } from "GLRender";
import { REPLManager, REPLSettings } from 'REPLManager';
import { BraceBalancedFormatter } from "BraceBalancedFormatter";
import { WhitespaceFormatter } from "WhitespaceFormatter";
import { SingleLineOutputFormatter } from "SingleLineOutputFormatter";

//strict brace balanced formatter as default
const bbf = new BraceBalancedFormatter(true);
const wsf = new WhitespaceFormatter();
const slf = new SingleLineOutputFormatter("");

exports.glRender = new GLRender(Date.now());
//Default repl manager has editorLines: number = 30, maxChars: number = 80, indentation: number = 4
//you can change this via the config rather than here!
exports.repl = new REPLManager(new REPLSettings(), [], [wsf, bbf, slf]);
