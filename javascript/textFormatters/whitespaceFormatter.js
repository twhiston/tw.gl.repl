exports.format = function (strArr, strict) {

    var out = strArr.map(function (t) {
        return t.replace(/\s+/g, ' ').trim();
    })

    return out;
}