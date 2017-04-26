<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Type;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170426140629 extends AbstractMigration
{
    protected const TABLE_NAME = "item";

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $table = $schema->createTable(static::TABLE_NAME);
        $table->addColumn("id", Type::INTEGER)
            ->setAutoincrement(true);
        $table->addColumn("title", Type::STRING)
            ->setLength(255)
            ->setNotnull(true);
        $table->addColumn("content", Type::TEXT)
            ->setNotnull(true);
        $table->addColumn("status", Type::INTEGER)
            ->setNotnull(true);
        $table->addColumn("user_id", Type::INTEGER)
            ->setNotnull(true);
        $table->addColumn("created_at", Type::INTEGER)
            ->setNotnull(true);
        $table->addColumn("updated_at", Type::INTEGER)
            ->setNotnull(true);
        $table->setPrimaryKey(["id"]);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $schema->dropTable(static::TABLE_NAME);
    }
}
