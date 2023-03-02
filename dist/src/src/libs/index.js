"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const xsh_node_logger_1 = require("@boxbag/xsh-node-logger");
const config_1 = require("src/config");
const correlation_id_1 = require("src/util/correlation-id");
const loggerConfig = new config_1.Config().logger;
exports.logger = (0, xsh_node_logger_1.createLogger)({
    options: {
        level: loggerConfig.level,
        mixin() {
            const correlationId = (0, correlation_id_1.getCorrelationId)();
            return Object.assign({ environment: loggerConfig.environment, service: loggerConfig.serviceName }, (correlationId && { correlationId }));
        },
    },
});
//# sourceMappingURL=index.js.map