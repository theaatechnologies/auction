/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-classes-per-file
import {EntityRepository, getCustomRepository, Repository, UpdateResult,} from "typeorm";
import Item, {StateType} from "src/libs/typeorm/entities/item";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@EntityRepository(Item)
class TypeormRepository extends Repository<Item> {}

export class ItemRepository {
  private typeormRepository: TypeormRepository;

  constructor() {
    this.typeormRepository = getCustomRepository(TypeormRepository);
  }

  public async save(item: Item): Promise<Item> {
    console.log("saving item", item, this.typeormRepository);
    return this.typeormRepository.save(item);
  }

  public async getByName(
    name: string,
  ): Promise<Item | undefined> {
    return await this.typeormRepository.findOne({name});
  }

  public async update(
      id: string,
      item: QueryDeepPartialEntity<Item>
  ): Promise<UpdateResult> {
    return await this.typeormRepository.update(id, item);
  }
}
