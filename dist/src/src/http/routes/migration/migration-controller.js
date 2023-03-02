"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const orders_service_1 = require("src/services/orders-service");
const migration_validator_1 = require("src/http/routes/migration/migration-validator");
let MigrationController = class MigrationController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post("/orders", this.createOrder.bind(this));
        this.router.delete("/orders/:id", this.deleteOrder.bind(this));
    }
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = this.migrationValidator.validateAndMapCreateOrderBody(req.body);
                const orderId = yield this.ordersService.upsertForMigration(req.user.business_id, body);
                res.send({ id: orderId });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ordersService.deleteByIdAndBusinessIdForMigration(req.params.id, req.user.business_id);
                res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(migration_validator_1.MigrationValidator),
    __metadata("design:type", migration_validator_1.MigrationValidator)
], MigrationController.prototype, "migrationValidator", void 0);
__decorate([
    (0, inversify_1.inject)(orders_service_1.OrdersService),
    __metadata("design:type", typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object)
], MigrationController.prototype, "ordersService", void 0);
MigrationController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MigrationController);
exports.MigrationController = MigrationController;
//# sourceMappingURL=migration-controller.js.map