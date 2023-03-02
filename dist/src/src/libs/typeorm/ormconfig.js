"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const entities_1 = __importDefault(require("./entities"));
const migrations_1 = __importDefault(require("./migrations"));
const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, PROFILEDB, } = process.env;
const underlyingDriverConfig = {
    // db.getClient wait time on a full pool connection before timing out
    connectionTimeoutMillis: 10000,
    // time before the pool releases the client and db.getClient has to reconnect
    idleTimeoutMillis: 60000,
    // time to consider query is taking too long
    statement_timeout: 360000, // 6 minutes
};
function createProfilingOptions() {
    return {
        maxQueryExecutionTime: 20,
        logging: ['query'],
    };
}
const baseConfig = Object.assign({ logging: true, entities: entities_1.default,
    migrations: migrations_1.default, cli: {
        entitiesDir: 'src/libs/typeorm/entities',
        migrationsDir: 'src/libs/typeorm/migrations',
        subscribersDir: 'src/libs/typeorm/subscribers'
    }, uuidExtension: 'pgcrypto', type: 'postgres', host: PGHOST || 'localhost', port: PGPORT || 54321, username: PGUSER || 'test', password: PGPASSWORD || 'test', database: PGDATABASE || 'test', extra: underlyingDriverConfig }, (PROFILEDB === '1' ? createProfilingOptions() : {}));
module.exports = [
    Object.assign(Object.assign({}, baseConfig), { name: 'default', extra: Object.assign(Object.assign({}, underlyingDriverConfig), { statement_timeout: 45000 }) })
];
//# sourceMappingURL=ormconfig.js.map