
//Keybindings
var keyList = []
function keyDef(id, code, hint) {
    return {
        id: id,
        code: code,
        hint: hint
    }
}
var intKeys = [
    keyDef("space", -2, ""),
    keyDef("escape", -3, ""),
    keyDef("return", -4, ""),
    keyDef("tab", -5, ""),
    keyDef("delete", -6, ""),
    keyDef("backspace", -7, ""),
    keyDef("up", -9, ""),
    keyDef("down", -10, ""),
    keyDef("left", -11, ""),
    keyDef("right", -12, ""),
];


function procDef(id, call) {
    return {
        id: id,
        call: call,
    }
}
const intProc = [
    procDef(-2, function (k, wm) { wm.addChar(32); }),
    procDef(-3, function (k, wm) { }),
    procDef(-4, function (k, wm) { wm.newLine(); }),
    procDef(-5, function (k, wm) { addTab(); }),
    procDef(-6, function (k, wm) { wm.deleteChar(); }),
    procDef(-7, function (k, wm) { wm.backSpace(); }),
    procDef(-9, upDown),
    procDef(-10, upDown),
    procDef(-11, leftRight),
    procDef(-12, leftRight),
]

function upDown(k, wm) {
    wm.gotoLine(1 - (k + 10));
}

function leftRight(k, wm) {
    wm.gotoCharacter(1 - (k + 12));
}


var processors = intProc;

// load keybindings from json file
exports.setBindings = function (dict) {
    keyList = intKeys;
    var keys = sKeys.getkeys()
    for (let i = 0; i < keys.length; i++) {
        var binding = sKeys.get(keys[i]);
        keyList.append(keyDef(keys[i], binding[1], binding[0]));
    }
}

exports.addProcessor = function (proc) {
    processors.append(proc);
}

// choose method based on keypress
exports.handle = function (k) {

    var exists = keyList.filter(obj => {
        return obj.code === k
    })
    if (exists !== undefined || exists.length > 0) {
        var pList = processors.filter(obj => {
            return obj.code === k
        })
        return pList;
    } else if (k > 32 && k <= 126) {
        return [function (k, wm) { wm.addChar(k) }]
    } else {
        post("unknown keypress: @char", k, "\n");
        return [];
    }
    // post("@char", k, "\n");
    if (k == sKeys.get("disable-editor")[1]) {
        disableText();
    }
    else if (!isDisabled) {
        // CHARACTER KEYS
        if (k > 32 && k <= 126) { addChar(k); }


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

    // for (var t=0; t<textBuf.length; t++){
    // 	post('line: '+ t + "| ", textBuf[t], "\n");
    // }
}