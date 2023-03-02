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
exports.AuthController = void 0;
const express_1 = require("express");
const users_service_1 = require("../../services/users-service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const debug_1 = __importDefault(require("debug"));
const password_1 = require("../../common/services/password");
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
const response_1 = require("src/utils/response");
const user_not_found_error_1 = require("src/errors/user-not-found-error");
const user_already_exist_error_1 = require("src/errors/user-already-exist-error");
const jwtSecret = process.env.JWT_SECRET || "auction";
const tokenExpirationInSeconds = 36000;
const log = (0, debug_1.default)("auth:controller");
let AuthController = class AuthController {
    constructor(usersService) {
        this.router = (0, express_1.Router)();
        this.router.post("/login", this.login.bind(this));
        this.router.post("/register", this.register.bind(this));
        this.usersService = usersService;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("login request...", req.body);
                const email = req.body.email;
                const password = req.body.password;
                const user = yield this.usersService.findUserByEmail(email);
                log("user", user);
                if (user) {
                    const isPasswordMatch = yield password_1.Password.compare(user.password, password);
                    if (!isPasswordMatch) {
                        throw new Error("Invalid Password");
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                            expiresIn: tokenExpirationInSeconds,
                        });
                        return res.status(200).json({
                            success: true,
                            data: user,
                            token,
                        });
                    }
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
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username;
                const email = req.body.email;
                const password = req.body.password;
                const user = yield this.usersService.findUserByEmail(email);
                if (user) {
                    throw new user_already_exist_error_1.UserAlreadyExistError();
                }
                else {
                    try {
                        const id = (0, uuid_1.v4)();
                        const pass = yield password_1.Password.toHash(password);
                        const user = {
                            username,
                            email,
                            password: pass
                        };
                        const newUser = yield this.usersService.createUser(Object.assign(Object.assign({}, user), { id }));
                        const token = jsonwebtoken_1.default.sign({ username, password }, jwtSecret, {
                            expiresIn: tokenExpirationInSeconds,
                        });
                        return res.status(201).json({
                            success: true,
                            data: newUser,
                            token,
                        });
                    }
                    catch (e) {
                        throw new Error("Error while register");
                    }
                }
            }
            catch (e) {
                (0, response_1.sendError)(res, e);
            }
        });
    }
};
AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map