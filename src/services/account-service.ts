import {AccountRepository} from "src/repositories/account-repository";
import Account from "src/libs/typeorm/entities/account";
import {AccountInput} from "src/model/account-input";
import {v4 as uuidv4} from 'uuid';
import {UsersRepository} from "src/repositories/users-repository";
import {UserNotFoundError} from "src/errors/user-not-found-error";
import User from "src/libs/typeorm/entities/user";
import {injectable} from "inversify";

@injectable()
export class AccountService {

    private readonly accountRepository: AccountRepository;
    private readonly usersRepository: UsersRepository;

    constructor(accountRepository: AccountRepository, usersRepository: UsersRepository) {
        this.accountRepository = accountRepository;
        this.usersRepository = usersRepository;
    }

    async deposit(data: AccountInput) {

        const curAccount: Account = await this.accountRepository.findByUserId(data.user);

        if (!curAccount) {
            const account: Account = {
                id: uuidv4(),
                user_id: data.user,
                balance: data.deposit
            }
            await this.accountRepository.save(account);
        } else {
            curAccount.balance = Number(curAccount.balance) + Number(data.deposit);
            await this.accountRepository.save(curAccount);
        }
    }
}