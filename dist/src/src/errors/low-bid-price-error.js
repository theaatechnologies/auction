"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowBidPriceError = void 0;
const not_allowed_error_1 = require("./not-allowed-error");
class LowBidPriceError extends not_allowed_error_1.NotAllowedError {
    constructor() {
        super("LOW_BID_PRICE", "Bid price is lower than the item price.");
    }
}
exports.LowBidPriceError = LowBidPriceError;
//# sourceMappingURL=low-bid-price-error.js.map