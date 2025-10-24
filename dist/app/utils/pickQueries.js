"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQueries = void 0;
const pickQueries = (obj, keys) => {
    const finalObject = {};
    for (let key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObject[key] = obj[key];
        }
    }
    return finalObject;
};
exports.pickQueries = pickQueries;
