// fixed keybindings
var keys = {
    "execute": ["alt-return", 2044],
    "comment": ["alt-/", 247],
    "silence": ["alt-.", 8805],
    "disable-editor": ["alt-,", 8804],
    "clear": ["alt-z", 937],
    "delete-line": ["alt-x", 8776],
    "copy-line": ["alt-c", 231],
    "copy-all": ["alt-k", 730],
    "paste-line": ["alt-v", 8730],
    "paste-replace-line": ["alt-p", 960],
    "jump-top": ["alt-up", 2039],
    "jump-bottom": ["alt-down", 2038],
    "jump-begin": ["alt-left", 2037],
    "jump-end": ["alt-right", 2036],
    "up": ["alt-w", 8721],
    "down": ["alt-s", 223],
    "left": ["alt-a", 229],
    "right": ["alt-d", 8706],
    "jump-word-left": ["alt-j", 8710],
    "jump-word-right": ["alt-l", 172],
    "ephemeral-mode": ["alt-g", 169]
}

const intProcessors = {
    "space": function () { addChar(32); }
}
var keyList = []
var intKeys = {
    "space": ["", -2],
    "escape": ["", -3],
    "return": ["", -4],
    "tab": ["", -5],
    "delete": ["", -6],
    "backspace": ["", -7],
    "up": ["", -9],
    "down": ["", -10],
    "left": ["", -11],
    "right": ["", -12]
}

// load keybindings from json file
var sKeys = new Dict();
var processors = new Dict();

exports.setBindings = function (dict) {
    keyList = intKeys;
    sKeys = new Dict(dict);
    var keys = sKeys.getkeys()
    for (let i = 0; i < keys.length; i++) {
        keyList.append(sKeys.get(i)[1]);
    }
}

// choose method based on keypress
exports.handle = function (k) {

    let exists = keyList.find(k);
    if (exists) {
        if (processors.contains(k)) {
            processors.get(k).process(k);
        }
    } else if (k > 32 && k <= 126) {

    } else {
        post("unknown keypress: @char", k, "\n");
    }
    // post("@char", k, "\n");
    if (k == sKeys.get("disable-editor")[1]) {
        disableText();
    }
    else if (!isDisabled) {
        // CHARACTER KEYS
        if (k > 32 && k <= 126) { addChar(k); }
        else if (k == keys["space"]) { addChar(32); }

        // FUNCTION KEYS
        else if (k == keys["return"]) { newLine(); }
        // Backspace Win = 8, Mac = 127
        // Delete Win = 127, Mac = 127
        else if (k == keys["backspace"]) { backSpace(); }
        else if (k == keys["delete"]) { deleteChar(); }
        // arrow keys Platform-independent
        else if (k == keys["tab"]) { addTab(); }
        else if (k == keys["up"] || k == keys["down"]) {
            gotoLine(1 - (k + 10));
        }
        else if (k == keys["left"] || k == keys["right"]) {
            gotoCharacter(1 - (k + 12));
        }

        // arrow keys ASCII
        // else if (k == 30 || k == 31){ gotoLine(k-30); }
        // else if (k == 28 || k == 29){ gotoCharacter(k-28); }

        // SHORTKEYS
        else if (k == sKeys.get("comment")[1]) { commentLine(); }

        else if (k == sKeys.get("delete-line")[1]) { deleteLine(); }
        else if (k == sKeys.get("copy-line")[1]) { copyLine(); }
        else if (k == sKeys.get("copy-all")[1]) { copyAll(); }
        else if (k == sKeys.get("paste-line")[1]) { pasteInsertLine(); }
        else if (k == sKeys.get("paste-replace-line")[1]) { pasteReplaceLine(); }

        else if (k == sKeys.get("clear")[1]) { clear(); }
        else if (k == sKeys.get("ephemeral-mode")[1]) { EPHEMERAL_MODE = !EPHEMERAL_MODE; }
        // else if (k == ALT_B){ backSpace(); }

        // Jump Top/Bottom/Start/End with ALT + Arrow Keys
        else if (k == sKeys.get("jump-top")[1]) { jumpTo(2); }
        else if (k == sKeys.get("jump-bottom")[1]) { jumpTo(3); }
        else if (k == sKeys.get("jump-begin")[1]) { jumpTo(0); }
        else if (k == sKeys.get("jump-end")[1]) { jumpTo(1); }

        // Navigate the editor with ASDW
        else if (k == sKeys.get("left")[1]) { gotoCharacter(0); }
        else if (k == sKeys.get("right")[1]) { gotoCharacter(1); }
        else if (k == sKeys.get("down")[1]) { gotoLine(1); }
        else if (k == sKeys.get("up")[1]) { gotoLine(0); }

        else if (k == sKeys.get("jump-word-left")[1]) { gotoWord(0); }
        else if (k == sKeys.get("jump-word-right")[1]) { gotoWord(1); }

        // Jump to top/bottom
        // else if (k == ALT_Q){ jumpTo(2); }
        // else if (k == ALT_SHFT_Q){ jumpTo(3); }

        // TO-DO
        // else if (k == ALT_Z){ getHistory(); }
    }
    draw();

    // for (var t=0; t<textBuf.length; t++){
    // 	post('line: '+ t + "| ", textBuf[t], "\n");
    // }
}