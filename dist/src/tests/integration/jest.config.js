"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = {
    preset: "ts-jest",
    setupFilesAfterEnv: ["./setup.ts"],
    restoreMocks: true,
    moduleNameMapper: {
        "^src/(.*)$": (0, path_1.resolve)(__dirname, "../../src/$1"),
        "^tests/(.*)$": (0, path_1.resolve)(__dirname, "../../tests/$1"),
    },
};
//# sourceMappingURL=jest.config.js.map