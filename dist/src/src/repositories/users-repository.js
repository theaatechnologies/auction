"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UsersRepository = void 0;
/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-classes-per-file
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("src/libs/typeorm/entities/user"));
const user_not_found_error_1 = require("src/errors/user-not-found-error");
let TypeormRepository = class TypeormRepository extends typeorm_1.Repository {
};
TypeormRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_1.default)
], TypeormRepository);
class UsersRepository {
    constructor() {
        this.typeormRepository = (0, typeorm_1.getCustomRepository)(TypeormRepository);
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.typeormRepository.save(user);
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.typeormRepository.update(id, user);
        });
    }
    getByIdAndBusinessId(itemId, businessId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.typeormRepository.findOne(Object.assign({ where: { id: itemId, business_id: businessId } }, (relations && { relations })));
            if (!item)
                throw new user_not_found_error_1.UserNotFoundError();
            return item;
        });
    }
    insertOne(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.typeormRepository.insert(item);
            return result.identifiers[0].id;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.typeormRepository.findOne({ email });
        });
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users-repository.js.map