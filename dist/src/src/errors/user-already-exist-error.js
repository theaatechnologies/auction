"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistError = void 0;
const not_allowed_error_1 = require("./not-allowed-error");
class UserAlreadyExistError extends not_allowed_error_1.NotAllowedError {
    constructor() {
        super("USER_AlREADY_EXISTS", "User already exists.");
    }
}
exports.UserAlreadyExistError = UserAlreadyExistError;
//# sourceMappingURL=user-already-exist-error.js.map