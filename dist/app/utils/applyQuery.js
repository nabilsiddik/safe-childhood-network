"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyQuery = applyQuery;
function applyQuery(model, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const page = options.page && options.page > 0 ? options.page : 1;
        const limit = options.limit && options.limit > 0 ? options.limit : 10;
        const skip = (page - 1) * limit;
        const filter = options.filter || {};
        // Search
        if (options.search && ((_a = options.searchFields) === null || _a === void 0 ? void 0 : _a.length)) {
            const searchRegex = new RegExp(options.search, "i");
            filter.$or = options.searchFields.map((field) => ({ [field]: searchRegex }));
        }
        // Total count with filter
        const total = yield model.countDocuments(filter);
        // Sorting
        let sort = {};
        if (options.sortField) {
            sort[options.sortField] = options.sortOrder === 'asc' ? 1 : -1;
        }
        else {
            sort = { createdAt: -1 };
        }
        const data = yield model.find(filter).sort(sort).skip(skip).limit(limit);
        return { data, total, page, limit };
    });
}
