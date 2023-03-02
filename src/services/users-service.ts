
import {UsersRepository} from "src/repositories/users-repository";
import User from "src/libs/typeorm/entities/user";
import {injectable} from "inversify";
@injectable()
export class UsersService {

    private readonly usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(data: User) {
        return await this.usersRepository.save(data);
    }

    async findUserByEmail(email: string): Promise<User> {
       return this.usersRepository.findByEmail(email);
    }
}