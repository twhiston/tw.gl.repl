"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
inlets = 1;
outlets = 0;
var p = this.patcher;
var objects = [];
function has(id, objects) {
    var fromObj = objects.find(function (x) { return x.id === id; });
    if (fromObj === undefined) {
        error("fromId: " + id + " does not exist");
        return;
    }
    return fromObj;
}
function n(type, posX, posY, args) {
    if (type === 'patcher') {
        var timestamp = new Date().getTime();
        var subpatcherName = "subpatcher_" + timestamp;
        var existing_1 = objects.filter(function (x) { return x.type === type; });
        var nobj_1 = {
            id: type + existing_1.length.toString(),
            type: type,
            obj: p.newdefault.apply(p, __spreadArray([posX || 0, posY || 0, "p", subpatcherName], args || [], false)),
            patcher: p.name,
            name: subpatcherName
        };
        objects.push(nobj_1);
        p = nobj_1.obj.subpatcher(0);
        p.locked = true;
        return;
    }
    if (type === 'bang') {
        type = 'button';
    }
    var existing = objects.filter(function (x) { return x.type === type; });
    if (!Array.isArray(args))
        args = [args];
    var nobj = {
        id: type + existing.length.toString(),
        type: type,
        obj: p.newdefault.apply(p, __spreadArray([posX || 20, posY || 40, type], args || [], false)),
        patcher: p.name
    };
    objects.push(nobj);
}
function c(fromId, fromPort, toId, toPort) {
    var fromObj = has(fromId, objects);
    var toObj = has(toId, objects);
    p.connect(fromObj === null || fromObj === void 0 ? void 0 : fromObj.obj, fromPort, toObj === null || toObj === void 0 ? void 0 : toObj.obj, toPort);
}
function d(fromId, fromPort, toId, toPort) {
    var fromObj = has(fromId, objects);
    var toObj = has(toId, objects);
    p.disconnect(fromObj === null || fromObj === void 0 ? void 0 : fromObj.obj, fromPort, toObj === null || toObj === void 0 ? void 0 : toObj.obj, toPort);
}
function rm(id) {
    var obj = has(id, objects);
    var idx = objects.findIndex(function (x) { return x.id === id; });
    objects.splice(idx, 1);
    if ((obj === null || obj === void 0 ? void 0 : obj.type) === "patcher") {
        // although max will clean up the child objects itself we also need to do some
        // housekeeping when something is removed so it's easiest to handle by finding
        // what's in the patcher we are destroying and deleting all the children
        var child = objects.findIndex(function (x) { return x.patcher === obj.name; });
        while (child !== -1) {
            rm(objects[child].id);
            child = objects.findIndex(function (x) { return x.patcher === obj.name; });
        }
    }
    p.remove(obj === null || obj === void 0 ? void 0 : obj.obj);
}
function m() {
    var _a;
    var a = arrayfromargs(arguments);
    var obj = has(a.shift(), objects);
    obj === null || obj === void 0 ? void 0 : (_a = obj.obj).message.apply(_a, __spreadArray([a.shift()], a, false));
}
function ls() {
    objects.forEach(function (element) {
        post(element.id + "   " + element.type + "   " + element.patcher + "   " + element.name + "\n");
    });
}
Array.prototype.findIndex = function (callback, thisArg) {
    if (!callback || typeof callback !== 'function')
        throw TypeError();
    var size = this.length;
    var that = thisArg || this;
    for (var i = 0; i < size; i++) {
        try {
            if (!!callback.apply(that, [this[i], i, this])) {
                return i;
            }
        }
        catch (e) {
            return -1;
        }
    }
    return -1;
};
