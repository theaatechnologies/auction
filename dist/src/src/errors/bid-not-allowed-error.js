"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidNotAllowedError = void 0;
const not_allowed_error_1 = require("./not-allowed-error");
class BidNotAllowedError extends not_allowed_error_1.NotAllowedError {
    constructor() {
        super("BID_NOT_ALLOWED", "Current bid is not allowed.");
    }
}
exports.BidNotAllowedError = BidNotAllowedError;
//# sourceMappingURL=bid-not-allowed-error.js.map