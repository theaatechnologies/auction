"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemNotPublishedError = void 0;
const not_allowed_error_1 = require("./not-allowed-error");
class ItemNotPublishedError extends not_allowed_error_1.NotAllowedError {
    constructor() {
        super("ITEM_NOT_PUBLISHED", "Item has not been published.");
    }
}
exports.ItemNotPublishedError = ItemNotPublishedError;
//# sourceMappingURL=item-not-published-error.js.map