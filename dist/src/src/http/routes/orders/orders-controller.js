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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const orders_service_1 = require("src/services/orders-service");
const orders_validator_1 = require("src/http/routes/orders/orders-validator");
const csv_report_service_1 = require("src/services/csv-report-service");
let OrdersController = class OrdersController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get("/csv-report", this.getCSV.bind(this));
        this.router.get("/summary", this.getSummary.bind(this));
        this.router.get("/", this.getList.bind(this));
        this.router.post("/", this.create.bind(this));
        this.router.get("/:id", this.getById.bind(this));
        this.router.put("/:id/status", this.update.bind(this));
        this.router.delete("/:id", this.delete.bind(this));
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = this.ordersValidator.validateUpdateStatusBody(req.body);
                yield this.ordersService.updateStatus(req.user.business_id, req.params.id, body);
                res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCSV(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.ordersValidator.validateGetCSVQuery(req.query);
                const result = yield this.csvReportsService.getCsv(req.user.business_id, query);
                res.setHeader("Content-disposition", "attachment; filename=" + "orders.csv");
                res.send(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = this.ordersValidator.validateAndMapCreateBody(req.body);
                const orderId = yield this.ordersService.create(req.user.business_id, body);
                res.send({ id: orderId });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSummary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.ordersValidator.validateAndMapGetSummaryQuery(req.query);
                const { business_id: businessId } = req.user;
                const result = yield this.ordersService.getSummary(businessId, query);
                res.send(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.ordersValidator.validateAndMapGetListQuery(req.query);
                const result = yield this.ordersService.getList(req.user.business_id, Object.assign(Object.assign({}, query), { page: query.page, limit: query.limit }));
                res.send(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ordersService.getByBusinessIdAndId(req.user.business_id, req.params.id);
                res.send(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ordersService.delete(req.user.business_id, req.params.id);
                res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(orders_validator_1.OrdersValidator),
    __metadata("design:type", orders_validator_1.OrdersValidator)
], OrdersController.prototype, "ordersValidator", void 0);
__decorate([
    (0, inversify_1.inject)(orders_service_1.OrdersService),
    __metadata("design:type", typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object)
], OrdersController.prototype, "ordersService", void 0);
__decorate([
    (0, inversify_1.inject)(csv_report_service_1.CSVReportService),
    __metadata("design:type", typeof (_b = typeof csv_report_service_1.CSVReportService !== "undefined" && csv_report_service_1.CSVReportService) === "function" ? _b : Object)
], OrdersController.prototype, "csvReportsService", void 0);
OrdersController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders-controller.js.map