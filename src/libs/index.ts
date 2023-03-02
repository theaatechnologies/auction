import { createLogger } from "@boxbag/xsh-node-logger";
import { Config } from "src/config";
import { getCorrelationId } from "src/util/correlation-id";

const loggerConfig = new Config().logger;
export const logger = createLogger({
  options: {
    level: loggerConfig.level,
    mixin() {
      const correlationId = getCorrelationId();
      return {
        environment: loggerConfig.environment,
        service: loggerConfig.serviceName,
        ...(correlationId && { correlationId }),
      };
    },
  },
});
