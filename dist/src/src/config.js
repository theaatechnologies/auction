"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.PGPASSWORD = exports.PGUSER = exports.PGPORT = exports.PGHOST = exports.PGDATABASE = exports.NODE_KEEP_ALIVE_TIMEMOUT_MS = exports.PORT = exports.SERVICE_NAME = void 0;
exports.SERVICE_NAME = process.env.SERVICE_NAME || "auction";
exports.PORT = process.env.PORT || "3000";
exports.NODE_KEEP_ALIVE_TIMEMOUT_MS = Number(process.env.NODE_KEEP_ALIVE_TIMEMOUT_MS) || 65000;
// Envvars for default database connection
exports.PGDATABASE = process.env.PGDATABASE || "test";
exports.PGHOST = process.env.PGHOST || "localhost";
exports.PGPORT = Number(process.env.PGPORT) || 54320;
exports.PGUSER = process.env.PGUSER || "test";
exports.PGPASSWORD = process.env.PGPASSWORD || "test";
class Config {
    constructor() {
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map