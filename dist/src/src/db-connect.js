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
const typeorm_1 = require("typeorm");
const AlreadyHasActiveConnectionError_1 = require("typeorm/error/AlreadyHasActiveConnectionError");
const PostgresDriver_1 = require("typeorm/driver/postgres/PostgresDriver");
const sleep_1 = require("../src/libs/sleep");
const ormconfig_1 = __importDefault(require("../src/libs/typeorm/ormconfig"));
/* eslint no-await-in-loop: 0 */
// Handles unstable/intermitten connection lost to DB
function connectionGuard(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        // Access underlying pg driver
        if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
            const pool = connection.driver.master;
            // Add handler on pool error event
            pool.on('error', (err) => __awaiter(this, void 0, void 0, function* () {
                console.error(err, 'Connection pool erring out, Reconnecting...');
                yield connection.close();
                while (!connection.isConnected) {
                    try {
                        yield connection.connect();
                        console.info('Reconnected DB');
                    }
                    catch (error) {
                        console.error(error, 'Reconnect Error');
                    }
                    if (!connection.isConnected) {
                        // Throttle retry
                        yield (0, sleep_1.sleep)(500);
                    }
                }
            }));
        }
        return connection;
    });
}
// 1. Wait for db to come online and connect
// 2. On connection instability, able to reconnect
// 3. The app should never die due to connection issue
function connect(connectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        let connections;
        let isConnected;
        console.info('Connecting to DB...');
        while (!isConnected) {
            try {
                connections = yield Promise.all(ormconfig_1.default.map((o) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield (0, typeorm_1.createConnection)(o);
                    }
                    catch (e) {
                        if (e instanceof AlreadyHasActiveConnectionError_1.AlreadyHasActiveConnectionError) {
                            return (0, typeorm_1.getConnection)(o.name);
                        }
                        throw e;
                    }
                })));
                isConnected = connections.map(c => c.isConnected);
            }
            catch (error) {
                console.error(error, 'createConnection Error');
            }
            if (!isConnected) {
                // Throttle retry
                yield (0, sleep_1.sleep)(500);
            }
        }
        console.info('Connected to DB');
        return Promise.all(connections.map(c => connectionGuard(c)));
    });
}
exports.default = connect;
//# sourceMappingURL=db-connect.js.map