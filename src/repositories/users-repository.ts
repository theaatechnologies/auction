/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-classes-per-file
import {
  EntityRepository,
  In,
  Repository,
  getCustomRepository,
  UpdateResult,
} from "typeorm";
import User from "src/libs/typeorm/entities/user";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {UserNotFoundError} from "src/errors/user-not-found-error";
import {injectable} from "inversify";

@EntityRepository(User)
class TypeormRepository extends Repository<User> {}

@injectable()
export class UsersRepository {
  private typeormRepository: TypeormRepository;

  constructor() {
    this.typeormRepository = getCustomRepository(TypeormRepository);
  }

  public async save(user: User): Promise<User> {
    return this.typeormRepository.save(user);
  }

  public async update(
    id: string,
    user: QueryDeepPartialEntity<User>
  ): Promise<UpdateResult> {
    return this.typeormRepository.update(id, user);
  }

  public async getByIdAndBusinessId(
    itemId: string,
    businessId: string,
    relations?: string[]
  ): Promise<User> {
    const item = await this.typeormRepository.findOne({
      where: { id: itemId, business_id: businessId },
      ...(relations && { relations }),
    });
    if (!item) throw new UserNotFoundError();
    return item;
  }

  public async insertOne(item: Partial<User>): Promise<string> {
    const result = await this.typeormRepository.insert(item);
    return result.identifiers[0].id;
  }

  public async findByEmail(
    email: string,
  ): Promise<User> {
    return await this.typeormRepository.findOne({email});
  }
}
