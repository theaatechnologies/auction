"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteValidator = void 0;
const api_validation_bad_request_error_1 = require("src/errors/api-validation-bad-request-error");
class RouteValidator {
    validate(schema, data) {
        const { error, value } = schema.validate(data, { stripUnknown: true });
        if (error)
            throw new api_validation_bad_request_error_1.ApiValidationBadRequestError(error.message);
        return value;
    }
}
exports.RouteValidator = RouteValidator;
//# sourceMappingURL=route-validator.js.map