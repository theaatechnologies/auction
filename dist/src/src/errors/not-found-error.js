"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class NotFoundError extends ts_custom_error_1.CustomError {
    constructor(errorCode, message) {
        super(message);
        this.statusCode = 404;
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map