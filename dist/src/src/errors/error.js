"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardError = void 0;
class StandardError {
    constructor(errorCode, message, lastError, context) {
        this.error_code = errorCode;
        this.message = message;
    }
}
exports.StandardError = StandardError;
//# sourceMappingURL=error.js.map