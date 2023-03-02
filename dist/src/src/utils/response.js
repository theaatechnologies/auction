"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
function sendError(res, e) {
    res.status(e.statusCode).json({ message: e.message });
}
exports.sendError = sendError;
//# sourceMappingURL=response.js.map