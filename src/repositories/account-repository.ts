/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-classes-per-file
import {EntityRepository, getCustomRepository, Repository,} from "typeorm";
import Account from "src/libs/typeorm/entities/account";
import {injectable} from "inversify";

@EntityRepository(Account)
class TypeormRepository extends Repository<Account> {}

@injectable()
export class AccountRepository {
  private typeormRepository: TypeormRepository;

  constructor() {
    this.typeormRepository = getCustomRepository(TypeormRepository);
  }

  public async save(account: Account): Promise<Account> {
    return this.typeormRepository.save(account);
  }

  public async findByUserId(
    userId: string,
  ): Promise<Account | undefined> {
    return await this.typeormRepository.findOne({user_id: userId});
  }
}
