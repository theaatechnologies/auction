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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const uuid_1 = require("uuid");
class AccountService {
    constructor(accountRepository, usersRepository) {
        this.accountRepository = accountRepository;
        this.usersRepository = usersRepository;
    }
    deposit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const curAccount = yield this.accountRepository.findByUserId(data.user);
            if (!curAccount) {
                const account = {
                    id: (0, uuid_1.v4)(),
                    user_id: data.user,
                    balance: data.deposit
                };
                yield this.accountRepository.save(account);
            }
            else {
                curAccount.balance = Number(curAccount.balance) + Number(data.deposit);
                yield this.accountRepository.save(curAccount);
            }
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account-service.js.map