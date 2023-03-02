"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_server_1 = require("src/http/http-server");
const db_connect_1 = __importDefault(require("src/db-connect"));
const httpServer = new http_server_1.HttpServer();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_connect_1.default)();
        yield httpServer.start();
    });
}
start();
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SIGTERM signal received");
    yield httpServer.shutdown();
}));
process.on("unhandledRejection", (reason) => {
    console.log(reason, "unhandledRejection");
});
process.on("uncaughtException", (err) => {
    console.log(err, "uncaughtException");
});
//# sourceMappingURL=index.js.map