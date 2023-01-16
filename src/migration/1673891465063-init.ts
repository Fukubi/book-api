import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1673891465063 implements MigrationInterface {
  name = 'init1673891465063'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "writerName" varchar NOT NULL, "releaseDate" datetime NOT NULL, "publisher" varchar NOT NULL)')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "book"')
  }
}
