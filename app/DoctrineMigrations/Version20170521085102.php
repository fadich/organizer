<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170521085102 extends AbstractMigration
{
    protected const TABLE_NAME = "todo_item";

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $schema->renameTable('item', static::TABLE_NAME);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $schema->renameTable(static::TABLE_NAME, 'item');
    }
}
