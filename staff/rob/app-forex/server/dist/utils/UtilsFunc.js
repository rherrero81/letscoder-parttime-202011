"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc_sort = exports.asc_sort = void 0;
const asc_sort = (a, b) => {
    a = parseFloat(a.v);
    b = parseFloat(b.v);
    if (a > b)
        return 1;
    if (b > a)
        return -1;
    return 0;
};
exports.asc_sort = asc_sort;
const desc_sort = (a, b) => {
    a = parseFloat(a.v);
    b = parseFloat(b.v);
    if (a > b)
        return -1;
    if (b > a)
        return 1;
    return 0;
};
exports.desc_sort = desc_sort;
//# sourceMappingURL=UtilsFunc.js.map