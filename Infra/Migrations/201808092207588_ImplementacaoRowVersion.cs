namespace Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImplementacaoRowVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clientes", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Clientes", "RowVersion");
        }
    }
}
