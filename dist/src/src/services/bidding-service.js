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
exports.BiddingService = void 0;
const uuid_1 = require("uuid");
const item_not_found_error_1 = require("src/errors/item-not-found-error");
const low_bid_price_error_1 = require("src/errors/low-bid-price-error");
const bid_not_allowed_error_1 = require("src/errors/bid-not-allowed-error");
const item_1 = require("src/libs/typeorm/entities/item");
const item_not_published_error_1 = require("src/errors/item-not-published-error");
class BiddingService {
    constructor(biddingRepository, itemService) {
        this.biddingRepository = biddingRepository;
        this.itemService = itemService;
    }
    getAllCompleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.biddingRepository.getAllCompleted();
        });
    }
    getAll(itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.biddingRepository.getAll(itemName);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemService.getItem(data.item_name);
            if (!item)
                throw new item_not_found_error_1.ItemNotFoundError();
            if (data.bid_price < item.price)
                throw new low_bid_price_error_1.LowBidPriceError();
            if (item.state != item_1.StateType.PUBLISHED)
                throw new item_not_published_error_1.ItemNotPublishedError();
            const bidding = {
                id: (0, uuid_1.v4)(),
                item_id: item.id,
                bid_price: data.bid_price,
                created_at: new Date()
            };
            const lastBid = yield this.biddingRepository.get(item.id);
            if (lastBid.length) {
                throw new bid_not_allowed_error_1.BidNotAllowedError();
            }
            return this.biddingRepository.save(bidding);
        });
    }
}
exports.BiddingService = BiddingService;
//# sourceMappingURL=bidding-service.js.map