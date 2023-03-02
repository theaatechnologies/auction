"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plusSeconds = exports.subtractSeconds = void 0;
function subtractSeconds(numOfSeconds, date = new Date()) {
    date.setSeconds(date.getSeconds() - numOfSeconds);
    return date;
}
exports.subtractSeconds = subtractSeconds;
function plusSeconds(numOfSeconds, date = new Date()) {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    return date;
}
exports.plusSeconds = plusSeconds;
//# sourceMappingURL=time.js.map