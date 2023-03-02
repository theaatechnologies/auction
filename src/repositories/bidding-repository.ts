/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-classes-per-file
import {EntityRepository, getCustomRepository, Repository, UpdateResult,} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import Bidding from "src/libs/typeorm/entities/bidding";
import {plusSeconds, subtractSeconds} from "src/utils/time";

@EntityRepository(Bidding)
class TypeormRepository extends Repository<Bidding> {
}

export class BiddingRepository {
    public enable = false;
    private readonly typeormRepository: TypeormRepository;

    constructor() {
        this.typeormRepository = getCustomRepository(TypeormRepository);
    }

    public async save(bidding: Bidding): Promise<Bidding> {
        return this.typeormRepository.save(bidding);
    }

    public async update(
        id: string,
        bidding: QueryDeepPartialEntity<Bidding>
    ): Promise<UpdateResult> {
        return await this.typeormRepository.update(id, bidding);
    }

    public async getAllCompleted(): Promise<Bidding[]> {
        return this.typeormRepository.createQueryBuilder('bidding')
            .from('item', 'item')
            .andWhere('item.end < :curTime', {curTime: new Date()})
            .orderBy("item.created_at", "DESC")
            .execute();
    }

    public async getAll(
        item_name: string
    ): Promise<Bidding[]> {
        return this.typeormRepository.createQueryBuilder('bidding')
            .from('item', 'item')
            .where('item.name = :name', {name: item_name})
            .execute();
    }

    public async get(
        item_id: string
    ): Promise<Bidding[]> {

        const time = subtractSeconds(5);
        const curTime = new Date();
        return this.typeormRepository.createQueryBuilder('bidding')
            .where('item_id = :id', {id: item_id})
            .andWhere('created_at >= :time', {time: time})
            .andWhere('created_at <= :curTime', {curTime: curTime}).execute();
    }
}
