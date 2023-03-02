"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemNotFoundError = void 0;
const not_found_error_1 = require("./not-found-error");
class ItemNotFoundError extends not_found_error_1.NotFoundError {
    constructor() {
        super("ITEM_NOT_FOUND", "Item not found");
    }
}
exports.ItemNotFoundError = ItemNotFoundError;
//# sourceMappingURL=item-not-found-error.js.map