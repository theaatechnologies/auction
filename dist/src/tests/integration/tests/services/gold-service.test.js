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
const container_1 = require("src/container");
const gold_service_1 = require("src/services/gold-service");
describe("GoldService", () => {
    const goldService = container_1.container.get(gold_service_1.GoldService);
    describe("Gold profit", () => {
        it("should get max profit in 5 years", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield goldService.getMaxGoldProfit();
            expect(result).toEqual({
                "buyDate": "2018-09-28",
                "buyPrice": 139.32,
                "profit": 151598.83720930235,
                "profitPercent": 212.2954349698536,
                "saleDate": "2022-03-09",
                "salePrice": 295.77,
            });
        }));
    });
});
//# sourceMappingURL=gold-service.test.js.map