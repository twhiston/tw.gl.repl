import { GLRender } from "GLRender";
import { REPLManager, REPLSettings } from 'REPLManager';
import { BraceBalancedFormatter } from "BraceBalancedFormatter";
import { WhitespaceFormatter } from "WhitespaceFormatter";

//strict brace balanced formatter as default
let bbf = new BraceBalancedFormatter(true);
let wsf = new WhitespaceFormatter();

exports.glRender = new GLRender(Date.now());
//Default repl manager has editorLines: number = 30, maxChars: number = 80, indentation: number = 4
//you can change this via the config rather than here!
exports.repl = new REPLManager(new REPLSettings(), [], [wsf, bbf]);
