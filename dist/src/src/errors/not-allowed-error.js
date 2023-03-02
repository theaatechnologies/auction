"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAllowedError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class NotAllowedError extends ts_custom_error_1.CustomError {
    constructor(errorCode, message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.NotAllowedError = NotAllowedError;
//# sourceMappingURL=not-allowed-error.js.map