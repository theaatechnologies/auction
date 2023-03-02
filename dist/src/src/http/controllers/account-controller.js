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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const express_1 = require("express");
const users_service_1 = require("../../services/users-service");
const debug_1 = __importDefault(require("debug"));
const inversify_1 = require("inversify");
const account_service_1 = require("src/services/account-service");
const item_service_1 = require("src/services/item-service");
const bidding_service_1 = require("src/services/bidding-service");
const response_1 = require("src/utils/response");
const user_not_found_error_1 = require("src/errors/user-not-found-error");
const tsoa_1 = require("tsoa");
const jwtSecret = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;
const log = (0, debug_1.default)("auth:controller");
let AccountController = class AccountController {
    constructor(usersService, accountService, itemService, biddingService) {
        this.router = (0, express_1.Router)();
        this.router.post("/deposit", this.deposit.bind(this));
        this.router.post("/item", this.createItem.bind(this));
        this.router.post("/publish", this.publishItem.bind(this));
        this.router.post("/bid", this.bid.bind(this));
        this.router.get("/bids", this.getAllBids.bind(this));
        this.accountService = accountService;
        this.usersService = usersService;
        this.itemService = itemService;
        this.biddingService = biddingService;
    }
    deposit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("deposit request...", req.body);
                const email = req.body.email;
                const deposit = req.body.deposit;
                const user = yield this.usersService.findUserByEmail(email);
                log("user", user);
                if (user) {
                    yield this.accountService.deposit({ user: user.id, deposit });
                    return res.status(204).json({
                        success: true,
                        user_id: user.id
                    });
                }
                else {
                    throw new user_not_found_error_1.UserNotFoundError();
                }
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
    createItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("createItem request...", req.body);
                yield this.itemService.create(req.body);
                return res.status(201).json({
                    success: true,
                });
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
    publishItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("publishItem request...", req.body);
                yield this.itemService.publishItem(req.body.name);
                return res.status(204).json({
                    success: true,
                });
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
    bid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("bid request...", req.body);
                yield this.biddingService.create(req.body);
                return res.status(201).json({
                    success: true,
                });
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
    getAllBids(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Get all bids request...", req.body);
                const bids = yield this.biddingService.getAll(req.body.item_name);
                return res.status(200).json({
                    bids
                });
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Example)({
        email: "ahmad@gmail.com",
        deposit: "1"
    }),
    (0, tsoa_1.Post)('deposit'),
    (0, tsoa_1.SuccessResponse)("204", "Updated"),
    (0, tsoa_1.Response)(404),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deposit", null);
__decorate([
    (0, tsoa_1.Post)('create'),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createItem", null);
__decorate([
    (0, tsoa_1.Post)('publish'),
    (0, tsoa_1.SuccessResponse)("204", "Updated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "publishItem", null);
__decorate([
    (0, tsoa_1.Post)('bid'),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "bid", null);
__decorate([
    (0, tsoa_1.Get)('bids'),
    (0, tsoa_1.SuccessResponse)("200", "Success"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllBids", null);
AccountController = __decorate([
    (0, inversify_1.injectable)(),
    (0, tsoa_1.Route)('account'),
    __metadata("design:paramtypes", [users_service_1.UsersService, account_service_1.AccountService, item_service_1.ItemService, bidding_service_1.BiddingService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account-controller.js.map