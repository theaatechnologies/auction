import Item, {StateType} from "src/libs/typeorm/entities/item";
import {ItemInput} from "src/model/item-input";
import {v4 as uuidv4} from "uuid";
import {ItemRepository} from "src/repositories/item-repository";

export class ItemService {

    private readonly itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }

    async create(data: ItemInput): Promise<Item> {
        const item: Item = {
            id: uuidv4(),
            name: data.name,
            price: data.price,
            state: StateType.DRAFT,
            start: new Date(data.startTime),
            end: new Date(data.endTime),
            created_at: new Date()
        }

        console.log("itemservice create", item);

        return this.itemRepository.save(item);
    }

    async getItem(name: string): Promise<Item> {
       return this.itemRepository.getByName(name);
    }

    async publishItem(name: string): Promise<void> {
        const item: Item = await this.itemRepository.getByName(name);
        item.state = StateType.PUBLISHED;
        await this.itemRepository.update(item.id, item);

    }
}