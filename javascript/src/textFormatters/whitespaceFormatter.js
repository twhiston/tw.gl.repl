//replaces all forms of whitespace with a space and trims the end
exports.format = function (strArr, ctx) {
    var out = strArr.map(function (t) {
        return t.replace(/\s+/g, ' ').trim();
    })
    return out;
}