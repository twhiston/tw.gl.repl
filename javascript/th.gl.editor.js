//===================================================================
// th.gl.editor.js
// A responsive texteditor for the opengl environment

// written by Timo Hoogland (c) 2020
// www.timohoogland.com
// License
// GNU LGPL v.3

// FUNCTIONALITIES:
// - add characters by typing
// - capslock sensitive
// - move with cursors or shortkeys
// - backspace a character and a line
// - enter an extra line of text
// - use tab to input 4 spaces as indentation
// - copy insert a line of code to an other line
// - copy replace a line of code on an other line
// - delete a line of code and remove the line
// - console for display error messages
// - read a previous mercury file
// - write a mercury file every time the code runs

// TO DO:
// undo/redo history (matrixset?)
//===================================================================
const cursor = require("./src/Cursor/Cursor.js.js");
const wm = require("./windowManager.js");

autowatch = 1;
inlets = 1;
outlets = 3;

// GENERAL SETTINGS:
var CRSR = "<<";
var CMMT = "//";
var INDENTATION = 4;
var EDITOR_LINES = 30;
var MAX_CHARS = 80;
var LINE_CHARS = 140;
// var UNDO_HISTORY = 5;
// var CNSL_LINES = 40;
// var CNSL_CHARS = 24;
var OUT_MAT = 0;

var POST_FLAG = 1;

var EPHEMERAL_MODE = 0;

var key;
//var curLine, curChar, totalLines;
var isDisabled;

var CMMT_CHARS = [];



// var histMtxSet, hIndex;
// var cnslMtx, cnslText = [];


function init() {
	textBuf.clear();
	kh.setBindings(jsarguments[2]);

	if (jsarguments.length > 1) {
		drawto(jsarguments[1]);

	}
	clear();
	isDisabled = false;

	font("Courier New Bold");
	fontsize(100);
	leadscale(0.94);
	tracking(1);
	line_length(999999);
	alpha(1);

	cursor("<<");
	comment("//");

	draw();
}

function disableText() {
	isDisabled = 1 - isDisabled;
	alpha(1.0 - isDisabled * 0.5);
}

function clear() {
	wm.clear();
}

/* EXPERIMENTAL

function max_linelength(v){
	MAX_CHARS = Math.max(1, Math.min(Math.floor(v), LINE_CHARS - 40));
	init();
}

function max_lines(v){
	EDITOR_LINES = Math.max(1, Math.min(Math.floor(v), 40));
	init();
}*/

function empty() {
	textBuf.clear();
}


// enable the output_matrix flag
function output_matrix(v) {
	OUT_MAT = v != 0;
}

// load a dictionary of keybindings
// ** called via MAX
function keybindings(n) {
	kh.setBindings(n);
}

// choose method based on keypress
// ** called via MAX
function keyPress(k) {
	kh.handle(k)
	draw();
}

// move the cursor to the index of the letter in the full text
function gotoIndex(i) {
	wm.gotoIndex(i);
	draw();
}

function copyLine() {

	pasteBin = textBuf[curLine];
	outlet(2, pasteBin);
}
function copyAll() {
	var outBuf = [];
	for (var i = 0; i < textBuf.length(); i++) {
		outBuf[i] = textBuf[i].trim()
	}
	//TODO: make work with pasteBin to paste all back in without external commands
	outlet(2, outBuf.join('\\\n'));
}

function pasteReplaceLine() {
	if (pasteBin !== null) {
		// replace string with pastebin string
		textBuf[curLine] = pasteBin;
		// jump to end of new line
		jumpTo(1);
	}
}

function pasteInsertLine() {
	if (!endOfLines()) {
		jumpTo(0);
		newLine();
		gotoLine(0);
		return pasteReplaceLine();
	}
}

function endOfLines() {
	var isEnd = textBuf.length() >= EDITOR_LINES;
	if (isEnd) {
		post("WARNING: End of lines reached \n");
	}
	return isEnd;
}

// set the cursor characters
function cursor(c) {
	// post("@cursor: ", c, "\n");
	CRSR = c.toString();
	CRSR_CHARS = [];
	for (var i = 0; i < CRSR.length; i++) {
		CRSR_CHARS.push(CRSR[i].charCodeAt(0));
	}
	draw();
}

// set the comment characters
function comment(c) {
	//post("@comment: ", c, "\n");
	CMMT = c.toString();
	CMMT_CHARS = [];
	for (var i = 0; i < CMMT.length; i++) {
		CMMT_CHARS.push(CMMT[i].charCodeAt(0));
	}
	CMMT_CHARS = CMMT_CHARS.concat(32);
	draw();
}

// Add or remove comment at start of line
function commentLine() {
	// add comment-characters to regex
	// escape special characters
	var esc = CMMT.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

	var rgx = new RegExp('^ *' + esc + ' ?', 'g');
	// if has comment remove it, else add
	var line = textBuf.getLine(curLine);
	if (line.match(rgx)) {
		textBuf.setLine(curLine) = line.replace(rgx, '');
	} else {
		textBuf.setLine(curLine) = CMMT + ' ' + line;
	}
	curChar = textBuf.lineLength(curLine);
	// return true;
}

// MOVED TO GL BUT KEPT FOR INTERACTIONS!
// // draw the text to a jitter matrix as ascii
// function drawText() {
// 	textMtx = new JitterMatrix("text" + UNIQ, 1, "char", LINE_CHARS, textBuf.length());
// 	textMtx.setall(0);
// 	// draw all the characters as ascii code in a matrix
// 	for (var l = 0; l < textBuf.length(); l++) {
// 		// check if not an empty line/string
// 		if (!textBuf[l].match(/^[ \t]*$/g)) {
// 			for (var c = 0; c < textBuf.lineLength(length); c++) {
// 				textMtx.setcell2d(c, l, textBuf.getLine(l).charCodeAt(c));
// 			}
// 		}
// 	}
// }

// // draw the cursor to a jitter matrix as ascii
// function drawCursor() {
// 	crsrMtx = new JitterMatrix("crsr" + UNIQ, 1, "char", LINE_CHARS, textBuf.length());

// 	crsrMtx.setall(32);
// 	// draw at least something at the end of the matrix.
// 	for (var i = 0; i < textBuf.length(); i++) {
// 		crsrMtx.setcell2d(LINE_CHARS - 1, i, 46);
// 	}
// 	for (var c = 0; c < CRSR_CHARS.length; c++) {
// 		crsrMtx.setcell2d(curChar + c, curLine, CRSR_CHARS[c]);
// 	}
// }

// // draw the numbers to a jitter matrix as ascii
// function drawNumbers() {
// 	nmbrMtx = new JitterMatrix("nmbr" + UNIQ, 1, "char", 3, textBuf.length());

// 	for (var i = 0; i < textBuf.length(); i++) {
// 		var digits = new Array(2);
// 		digits[0] = String(Math.floor((i) / 10));
// 		digits[1] = String((i) % 10);
// 		if (digits[0] == 0) {
// 			digits[0] = " ";
// 		}
// 		// post(digit1.charCodeAt(0), digit2.charCodeAt(0));
// 		for (var n = 0; n < 2; n++) {
// 			nmbrMtx.setcell2d(n, i, digits[n].charCodeAt(0));
// 		}
// 	}
// 	nmbrMtx.setcell2d(0, curLine, 62);
// 	nmbrMtx.setcell2d(1, curLine, 62);
// }

/*function drawHighlight(){
	highlightMtx.setall(0);
	for (var i = 0; i < totalLines; i++){
		if (i == curLine){
			highlightMtx.setcell2d(0, i, 1.);
		}
	}
}*/

// read a textfile from disk to the editor
function readFile(mat) {
	fillText(mat);
	// jump to top and beginning
	jumpTo(2);
	jumpTo(0);

	draw();
}

// fill the matrix with the text from disk
function fillText(mat) {
	file = new JitterMatrix(mat);
	dimX = Math.min(MAX_CHARS, file.dim[0]);
	textBuf.length() = Math.min(EDITOR_LINES, file.dim[1]);
	// empty(totalLines);
	textBuf = [];

	for (var l = 0; l < textBuf.length(); l++) {
		textBuf.emptyLine(l);
		for (var c = 0; c < dimX; c++) {
			// read cell ascii value
			var v = file.getcell(c, l);
			// filter out values below 31
			textBuf.setLine(l, textBuf.getLine(l) + (v > 31) ? String.fromCharCode(v) : '');
		}
	}
}

// replace all the text with the incoming arguments
// this can be a list of symbols for every line
function set() {
	var text = arrayfromargs(arguments);
	text = (text.length < 1) ? '' : text;

	var inputLines = Math.min(EDITOR_LINES, text.length);
	text = text.slice(0, inputLines);
	// empty buffer
	textBuf.set(text);

	curLine = textBuf.length() - 1;
	jumpTo(2);
	jumpTo(1);
	draw();
}

// append a line of text or multiple symbols per line
function append() {
	var text = arrayfromargs(arguments);
	textBuf.append(text)
	jumpTo(2);
	jumpTo(1);
	draw();
}

// append a line of text or multiple symbols per line
function prepend() {
	var text = arrayfromargs(arguments);
	textBuf.prepend(text);
	jumpTo(2);
	jumpTo(1);
	draw();
}

// remove a line of text at a specified index
function remove(idx) {
	if (idx === undefined) { idx = textBuf.length() - 1; }
	curLine = idx;
	deleteLine();
	draw();
}

// insert a line of text or multiple symbols at a specified index
// a list of symbols will inserte one line per symbol
function insert() {
	var args = arrayfromargs(arguments);
	if (isNaN(args[0])) {
		post('insert(): index is not a number \n');
		return;
	}
	var idx = Math.min(EDITOR_LINES, args[0]);
	var text = args.slice(1);
	text = Array.isArray(text) ? text : [text];

	// exit if doesn't fit in editor
	if (totalLines + text.length > EDITOR_LINES) {
		post('insert(): maximum number of lines reached \n');
		return;
	}
	// if insert between totalLines
	if (idx < totalLines) {
		var u = textBuf.slice(0, Math.max(0, idx));
		u = Array.isArray(u) ? u : [u];
		u = u.concat(text);
		textBuf = u.concat(textBuf.slice(idx));
	} else {
		// else append to code and insert empty strings
		var diff = idx - totalLines;
		for (var d = 0; d < diff; d++) {
			textBuf.push('');
		}
		textBuf = textBuf.concat(text);
	}
	draw();
}

// add one or multiple characters as a string
function add(c) {
	c = (typeof c !== 'string') ? c.toString() : c;
	for (var i = 0; i < c.length; i++) {
		var char = c.charCodeAt(i);
		post('char', char, "\n");
		if (char === 13 || char === 10) {
			newLine();
		} else if (char > 31 && char < 126) {
			addChar(char);
		}
	}
	draw();
}

function back() {
	backSpace();
	draw();
}

function del() {
	deleteChar();
	draw();
}

/*function fillConsole(mess){
	mess = mess + " ";
	var dashes = CNSL_CHARS - (mess.length % CNSL_CHARS);
	for (var i = 0; i < dashes; i++){
		mess += "-";
	}

	for (var i = mess.length-1; i >= 0; i--){
		cnslText.unshift(mess.charCodeAt(i));
	}

	cnslText = cnslText.slice(0, CNSL_LINES*CNSL_CHARS);
	for (var i = 0; i < cnslText.length; i++){
		cnslMtx.setcell2d(i%CNSL_CHARS, Math.floor(i/CNSL_CHARS), cnslText[i]);
	}
	draw();
}

function emptyConsole(){
	cnslText = [];
	cnslMtx.setall(0);
	draw();
}*/

//===================================================================
// GL TEXT OBJECTS
//===================================================================

/*
var barAnim = new JitterObject("jit.anim.node");
barAnim.anim = ANIM_NODE;
barAnim.scale = [15, 0.12, 1];
barAnim.position = [0, -0.06, 0];
barAnim.anchor = [0, 0.12, 0];

var glTextBar = new JitterObject("jit.gl.gridshape");
glTextBar.drawto = NODE_CTX;
glTextBar.anim = barAnim.name;
glTextBar.color = [0, 0, 0, 0.5];
glTextBar.shape = "plane";
*/
/*
// the anim node and text for console
var cnslAnim = new JitterObject("jit.anim.node");
cnslAnim.anim = ANIM_NODE;
cnslAnim.inherit_scale = 0;
cnslAnim.inherit_position = 0;
cnslAnim.scale = [0.12, 0.12, 0.12];
cnslAnim.position = [0, -1.75, 0];

var glCnsl = new JitterObject("jit.gl.text");
glCnsl.drawto = NODE_CTX;
glCnsl.anim = cnslAnim.name;
glCnsl.gl_color = [1, 0.3, 0.4, 0.8];
glCnsl.screenmode = 0;
glCnsl.align = 2;

function positionCnsl(x, y, z){
	glCnsl.position = [x, y, z];
}

function scaleCnsl(x, y, z){
	glCnsl.scale = [x, y, z];
}
*/






//====================================================================
// written by Timo Hoogland (c) 2020
// 
// License
// The GNU LGPL v.3
//====================================================================