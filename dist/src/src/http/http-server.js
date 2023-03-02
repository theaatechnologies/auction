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
exports.HttpServer = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("src/config");
const inversify_1 = require("inversify");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_json_1 = __importDefault(require("src/http/openapi.json"));
const auth_controller_1 = require("src/http/controllers/auth-controller");
const body_parser_1 = __importDefault(require("body-parser"));
const users_repository_1 = require("src/repositories/users-repository");
const users_service_1 = require("src/services/users-service");
const account_repository_1 = require("src/repositories/account-repository");
const account_service_1 = require("src/services/account-service");
const account_controller_1 = require("src/http/controllers/account-controller");
const item_repository_1 = require("src/repositories/item-repository");
const item_service_1 = require("src/services/item-service");
const JWT_1 = __importDefault(require("src/common/middlewares/JWT"));
const bidding_repository_1 = require("src/repositories/bidding-repository");
const bidding_service_1 = require("src/services/bidding-service");
const guest_controller_1 = require("src/http/controllers/guest-controller");
let HttpServer = class HttpServer {
    constructor() {
        this.config = new config_1.Config();
    }
    start() {
        if (this.httpServer)
            return;
        const app = (0, express_1.default)();
        const usersRespository = new users_repository_1.UsersRepository();
        const usersService = new users_service_1.UsersService(usersRespository);
        this.authController = new auth_controller_1.AuthController(usersService);
        const accountRespository = new account_repository_1.AccountRepository();
        const accountService = new account_service_1.AccountService(accountRespository, usersRespository);
        const itemRespository = new item_repository_1.ItemRepository();
        const itemService = new item_service_1.ItemService(itemRespository);
        const biddingRepository = new bidding_repository_1.BiddingRepository();
        const biddingService = new bidding_service_1.BiddingService(biddingRepository, itemService);
        this.accountController = new account_controller_1.AccountController(usersService, accountService, itemService, biddingService);
        this.guestController = new guest_controller_1.GuestController(biddingService);
        // parse application/json
        app.use(body_parser_1.default.json());
        app.use('/docs', express_1.default.static(__dirname + '/swagger-ui'));
        app.use('/swagger.json', (req, res) => {
            res.sendFile(__dirname + '/swagger.json');
        });
        this.initRoutes(app);
        this.httpServer = app.listen(config_1.PORT);
        console.log({
            port: config_1.PORT,
        }, "Auction service started successfully...");
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.httpServer)
                return;
            yield new Promise((resolve) => this.httpServer.close(() => {
                console.log("Auction service shutdown");
                resolve();
            }));
        });
    }
    initRoutes(app) {
        app.use("/user", this.authController.router);
        app.use("/account", [JWT_1.default.authenticateJWT, this.accountController.router]);
        app.use("/guest", [this.guestController.router]);
        app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_json_1.default));
    }
};
__decorate([
    (0, inversify_1.inject)(config_1.Config),
    __metadata("design:type", config_1.Config)
], HttpServer.prototype, "config", void 0);
HttpServer = __decorate([
    (0, inversify_1.injectable)()
], HttpServer);
exports.HttpServer = HttpServer;
//# sourceMappingURL=http-server.js.map