import {v4 as uuidv4} from "uuid";
import {BiddingRepository} from "src/repositories/bidding-repository";
import Bidding from "src/libs/typeorm/entities/bidding";
import {BiddingInput} from "src/model/Bidding-input";
import {ItemService} from "src/services/item-service";
import {ItemNotFoundError} from "src/errors/item-not-found-error";
import {LowBidPriceError} from "src/errors/low-bid-price-error";
import {BidNotAllowedError} from "src/errors/bid-not-allowed-error";
import {StateType} from "src/libs/typeorm/entities/item";
import {ItemNotPublishedError} from "src/errors/item-not-published-error";

export class BiddingService {

    private readonly biddingRepository: BiddingRepository;
    private readonly itemService: ItemService;

    constructor(biddingRepository: BiddingRepository, itemService: ItemService) {
        this.biddingRepository = biddingRepository;
        this.itemService = itemService;
    }

    async getAllCompleted(): Promise<Bidding[]> {
        return await this.biddingRepository.getAllCompleted();
    }

    async getAll(itemName: string): Promise<Bidding[]> {
        return await this.biddingRepository.getAll(itemName);
    }

    async create(data: BiddingInput): Promise<Bidding> {
        const item = await this.itemService.getItem(data.item_name);

        if (!item)
            throw new ItemNotFoundError();

        if (data.bid_price < item.price)
            throw new LowBidPriceError();

        if (item.state != StateType.PUBLISHED)
            throw new ItemNotPublishedError();

        const bidding: Bidding = {
            id: uuidv4(),
            item_id: item.id,
            bid_price: data.bid_price,
            created_at: new Date()
        }

        const lastBid = await this.biddingRepository.get(item.id);
        if (lastBid.length) {
            throw new BidNotAllowedError();
        }

        return this.biddingRepository.save(bidding);
    }
}