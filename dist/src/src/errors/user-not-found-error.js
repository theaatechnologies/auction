"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const not_found_error_1 = require("./not-found-error");
class UserNotFoundError extends not_found_error_1.NotFoundError {
    constructor() {
        super("USER_NOT_FOUND", "User not found");
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=user-not-found-error.js.map