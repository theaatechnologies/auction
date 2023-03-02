"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const container = new inversify_1.Container({
    defaultScope: "Singleton",
    autoBindInjectable: true,
    skipBaseClassChecks: true,
});
exports.container = container;
//# sourceMappingURL=container.js.map