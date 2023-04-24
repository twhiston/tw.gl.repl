
interface Array<T> {
    getMaxChar(): number
}

Array.prototype.getMaxChar = function () {
    var lengths = [];
    for (var l = 0; l < this.length; l++) {
        lengths[l] = this[l].length;
    }
    var sortArr = lengths.slice(0);
    sortArr.sort(function (a, b) { return b - a });
    return sortArr[0] || 0;
};