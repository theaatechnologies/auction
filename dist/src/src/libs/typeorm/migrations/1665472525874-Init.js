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
exports.Init1665472525874 = void 0;
class Init1665472525874 {
    constructor() {
        this.name = "Init1665472525874";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8451013" PRIMARY KEY ("id"))');
            yield queryRunner.query('CREATE TABLE "account" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "balance" integer DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8452000" PRIMARY KEY ("id"), CONSTRAINT fk_userid FOREIGN KEY ("user_id") REFERENCES "user"("id"))');
            yield queryRunner.query('CREATE TYPE status_type AS ENUM(\'DRAFT\', \'PUBLISHED\')');
            yield queryRunner.query('CREATE TABLE "item" ("id" uuid NOT NULL, "name" character varying NOT NULL, "state" status_type NOT NULL, "price" integer, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL,"created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8452002" PRIMARY KEY ("id"))');
            yield queryRunner.query('CREATE TABLE "bidding" ("id" uuid NOT NULL, "item_id" uuid NOT NULL, "bid_price" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8455000" PRIMARY KEY ("id"), CONSTRAINT fk_itemid FOREIGN KEY ("item_id") REFERENCES "item"("id"))');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('drop table "user"');
            yield queryRunner.query('drop type "status_type"');
            yield queryRunner.query('drop table "billing"');
            yield queryRunner.query('drop table "item"');
            yield queryRunner.query('drop table "bidding"');
        });
    }
}
exports.Init1665472525874 = Init1665472525874;
//# sourceMappingURL=1665472525874-Init.js.map