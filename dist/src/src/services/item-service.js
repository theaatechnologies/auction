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
exports.ItemService = void 0;
const item_1 = require("src/libs/typeorm/entities/item");
const uuid_1 = require("uuid");
class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = {
                id: (0, uuid_1.v4)(),
                name: data.name,
                price: data.price,
                state: item_1.StateType.DRAFT,
                start: new Date(data.startTime),
                end: new Date(data.endTime),
                created_at: new Date()
            };
            console.log("itemservice create", item);
            return this.itemRepository.save(item);
        });
    }
    getItem(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.itemRepository.getByName(name);
        });
    }
    publishItem(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemRepository.getByName(name);
            item.state = item_1.StateType.PUBLISHED;
            yield this.itemRepository.update(item.id, item);
        });
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item-service.js.map