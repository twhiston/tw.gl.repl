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
const cursor = require("./cursor.js");
const wm = require("./windowManager.js");
const pb = require("./pastebin.js");

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

var CRSR_CHARS = [];
var CMMT_CHARS = [];

var UNIQ = Date.now();

// matrices for text display
var textMtx, crsrMtx, nmbrMtx;

// var histMtxSet, hIndex;
// var cnslMtx, cnslText = [];

function loadbang() {
	init();
}

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

// output the parsed code if output_matrix is disabled
function run() {
	outlet(0, "jit_matrix", textMtx.name);
	if (!OUT_MAT) {
		var out = textBuf.format(false);
		outlet(0, out);
		// outlet(0, mtxToSymbol(textMtx));
	}
	if (EPHEMERAL_MODE) {
		clear();
	}
}

// enable the output_matrix flag
function output_matrix(v) {
	OUT_MAT = v != 0;
}

// draw the text and output all info
function draw() {
	// update number of lines
	//TODO: dont really see why we need this value, try removing everywhere
	//totalLines = textBuf.length;

	drawText(); //place the strings as text in a matrix
	drawCursor(); //set the cursorposition
	drawNumbers(); //store the numbers in the matrix
	matrixToText(); //set the matrices to the gl text objects
	// drawHighlight();

	var len = getMaxChar();
	outlet(1, "lines", textBuf.length());
	outlet(1, "line", cursor.getLine());
	outlet(1, "length", len);
	outlet(1, "nLength", len / MAX_CHARS);
	outlet(1, "nLines", (textBuf.length() - 1) / (EDITOR_LINES - 1));
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

// draw the text to a jitter matrix as ascii
function drawText() {
	textMtx = new JitterMatrix("text" + UNIQ, 1, "char", LINE_CHARS, textBuf.length());
	textMtx.setall(0);
	// draw all the characters as ascii code in a matrix
	for (var l = 0; l < textBuf.length(); l++) {
		// check if not an empty line/string
		if (!textBuf[l].match(/^[ \t]*$/g)) {
			for (var c = 0; c < textBuf.lineLength(length); c++) {
				textMtx.setcell2d(c, l, textBuf.getLine(l).charCodeAt(c));
			}
		}
	}
}

// draw the cursor to a jitter matrix as ascii
function drawCursor() {
	crsrMtx = new JitterMatrix("crsr" + UNIQ, 1, "char", LINE_CHARS, textBuf.length());

	crsrMtx.setall(32);
	// draw at least something at the end of the matrix.
	for (var i = 0; i < textBuf.length(); i++) {
		crsrMtx.setcell2d(LINE_CHARS - 1, i, 46);
	}
	for (var c = 0; c < CRSR_CHARS.length; c++) {
		crsrMtx.setcell2d(curChar + c, curLine, CRSR_CHARS[c]);
	}
}

// draw the numbers to a jitter matrix as ascii
function drawNumbers() {
	nmbrMtx = new JitterMatrix("nmbr" + UNIQ, 1, "char", 3, textBuf.length());

	for (var i = 0; i < textBuf.length(); i++) {
		var digits = new Array(2);
		digits[0] = String(Math.floor((i) / 10));
		digits[1] = String((i) % 10);
		if (digits[0] == 0) {
			digits[0] = " ";
		}
		// post(digit1.charCodeAt(0), digit2.charCodeAt(0));
		for (var n = 0; n < 2; n++) {
			nmbrMtx.setcell2d(n, i, digits[n].charCodeAt(0));
		}
	}
	nmbrMtx.setcell2d(0, curLine, 62);
	nmbrMtx.setcell2d(1, curLine, 62);
}

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

var MAIN_CTX = "CTX";
var NODE_CTX = "node" + UNIQ;
var ANIM_NODE = "anim" + UNIQ;
var CAM_CAP = "cam" + UNIQ;

var SCALING = 1;
var FONT_SIZE = 100;

// the main node that all text is drawn to
// for display on videoplane through camera capture
var textNode = new JitterObject("jit.gl.node");
textNode.fsaa = 1;
textNode.type = "float32";
textNode.name = NODE_CTX;
textNode.adapt = 0;

function drawto(v) {
	MAIN_CTX = v;
	textNode.drawto = MAIN_CTX;
	glVid.drawto = MAIN_CTX;
}

// the main anim node to position all text according to screensize
var animNode = new JitterObject("jit.anim.node");
animNode.name = ANIM_NODE;
animNode.position = [0, 0, 0];

// the text position
function position(x, y) {
	animNode.position = [x, y, 0];
}

// the text scaling
function scale(s) {
	SCALING = s * 100 / FONT_SIZE;
	animNode.scale = [SCALING, SCALING, 0];
}

// the anim node and text for the command line
var textAnim = new JitterObject("jit.anim.node");
textAnim.anim = ANIM_NODE;
textAnim.position = [0.9, 0, 0];

var glText = new JitterObject("jit.gl.text");
glText.drawto = NODE_CTX;
glText.anim = textAnim.name;
glText.gl_color = [1, 1, 1, 1];
glText.screenmode = 0;
glText.cull_face = 1;

var textColor = [1, 1, 1, 1];
var runColor = [0, 0, 0, 1];

function color() {
	args = arrayfromargs(arguments);
	if (args.length !== 4) {
		error("th.gl.editor: Expected an RGBA value in floating-point \n");
	} else {
		textColor = args;
		glText.gl_color = args;
	}
}

function run_color() {
	args = arrayfromargs(arguments);
	if (args.length !== 4) {
		error("th.gl.editor: Expected an RGBA value in floating-point \n");
	} else {
		runColor = args;
	}
}

function runBlink(t) {

	var c = [];
	for (var i = 0; i < textColor.length; i++) {
		c[i] = textColor[i] * (1 - t) + runColor[i] * t;
	}
	glText.gl_color = c;

	// if (t){
	// 	glText.gl_color = runColor;
	// } else {
	// 	glText.gl_color = textColor;
	// }
}

// the anim node and text for the cursor
var crsrAnim = new JitterObject("jit.anim.node");
crsrAnim.anim = ANIM_NODE;
crsrAnim.position = [0.9, 0, 0];

var glCrsr = new JitterObject("jit.gl.text");
glCrsr.drawto = NODE_CTX;
glCrsr.anim = crsrAnim.name;
glCrsr.screenmode = 0;
glCrsr.cull_face = 1;
glCrsr.layer = 10;

// the anim node and text for the line numbers
var nmbrAnim = new JitterObject("jit.anim.node");
nmbrAnim.anim = ANIM_NODE;

var glNmbr = new JitterObject("jit.gl.text");
glNmbr.drawto = NODE_CTX;
glNmbr.anim = nmbrAnim.name;
glNmbr.gl_color = [0.6, 0.6, 0.6, 1];
glNmbr.screenmode = 0;
glNmbr.cull_face = 1;
glNmbr.layer = 10;

function number_color() {
	args = arrayfromargs(arguments);
	if (args.length !== 4) {
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		glNmbr.gl_color = args;
	}
}

var useBlink = true;
var blinkToggle = 0;
var cursorColor = [1, 0.501961, 0, 1];
var blinkColor = [0.4, 0.8, 1, 1];

function blink() {
	if (useBlink) {
		blinkToggle = 1 - blinkToggle;
		if (blinkToggle) {
			glCrsr.gl_color = blinkColor;
		} else {
			glCrsr.gl_color = cursorColor;
		}
	} else {
		glCrsr.gl_color = cursorColor;
	}
}

function blink_enable(v) {
	useBlink = v != 0;
}

function cursor_color() {
	args = arrayfromargs(arguments);
	if (args.length !== 4) {
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		cursorColor = args;
	}
	blink();
}

function blink_color() {
	args = arrayfromargs(arguments);
	if (args.length !== 4) {
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		blinkColor = args;
	}
}

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

// add all objects to array for easy access when
// changing multiple parameters
// var allTextObj = [glText, glCrsr, glNmbr, glCnsl];
var allTextObj = [glText, glCrsr, glNmbr];

function font(f) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].font(f);
	}
}

function fontsize(s) {
	FONT_SIZE = s;
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].size(FONT_SIZE);
	}
	scale(SCALING);
	// textAnim.position = [0.9, 0, 0];
	// crsrAnim.position = [0.9, 0, 0];
}

function leadscale(l) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].leadscale = l;
	}
}

function tracking(t) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].tracking = t;
	}
}

function line_length(l) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].line_length = l;
	}
}

function line_width(w) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].line_length = w;
	}
}

var textAlpha = 1;

function alpha(a) {
	textAlpha = Math.max(0, Math.min(1, a));

	for (var i = 0; i < allTextObj.length; i++) {
		var c = allTextObj[i].gl_color;
		c[3] = textAlpha;
		allTextObj[i].gl_color = c;
	}
}

function cull_face(c) {
	for (var i = 0; i < allTextObj.length; i++) {
		allTextObj[i].cull_face = c;
	}
}


function matrixToText() {
	glText.jit_matrix(textMtx.name);
	glCrsr.jit_matrix(crsrMtx.name);
	glNmbr.jit_matrix(nmbrMtx.name);
	// glCnsl.jit_matrix(cnslMtx.name);
}

// the camera for capture
var glCam = new JitterObject("jit.gl.camera");
glCam.drawto = NODE_CTX;
glCam.out_name = CAM_CAP;
glCam.erase_color = [0, 0, 0, 0];
glCam.capture = 1;
glCam.ortho = 2;

// the videoplane for display in world
var glVid = new JitterObject("jit.gl.videoplane");
glVid.texture = CAM_CAP;
glVid.transform_reset = 2;
glVid.blend_enable = 1;
glVid.depth_enable = 0;
glVid.layer = 1000;
glVid.blend = "difference";

//====================================================================
// written by Timo Hoogland (c) 2020
// 
// License
// The GNU LGPL v.3
//====================================================================