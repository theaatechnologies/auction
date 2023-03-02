import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1665472525874 implements MigrationInterface {
  name = "Init1665472525874";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8451013" PRIMARY KEY ("id"))'
    );

    await queryRunner.query(
        'CREATE TABLE "account" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "balance" integer DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8452000" PRIMARY KEY ("id"), CONSTRAINT fk_userid FOREIGN KEY ("user_id") REFERENCES "user"("id"))'
    );
    await queryRunner.query('CREATE TYPE status_type AS ENUM(\'DRAFT\', \'PUBLISHED\')');

    await queryRunner.query(
        'CREATE TABLE "item" ("id" uuid NOT NULL, "name" character varying NOT NULL, "state" status_type NOT NULL, "price" integer, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL,"created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8452002" PRIMARY KEY ("id"))'
    );

    await queryRunner.query(
        'CREATE TABLE "bidding" ("id" uuid NOT NULL, "item_id" uuid NOT NULL, "bid_price" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4110e41866386ff2e43b8455000" PRIMARY KEY ("id"), CONSTRAINT fk_itemid FOREIGN KEY ("item_id") REFERENCES "item"("id"))'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table "user"');
    await queryRunner.query('drop type "status_type"');
    await queryRunner.query('drop table "billing"');
    await queryRunner.query('drop table "item"');
    await queryRunner.query('drop table "bidding"');
  }
}
