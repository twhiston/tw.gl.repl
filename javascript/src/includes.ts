import { GLRender } from "GLRender";
import { REPLManager } from 'REPLManager';


exports.glRender = new GLRender();
//Default repl manager has editorLines: number = 30, maxChars: number = 80, indentation: number = 4
exports.repl = new REPLManager();
