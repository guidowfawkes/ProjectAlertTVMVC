namespace Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ValidacaoCliente : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Clientes", "MacAdress", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Nome", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Cep", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Endereco", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Cidade", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Estado", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Clientes", "Estado", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Cidade", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Endereco", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Cep", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "Nome", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Clientes", "MacAdress", c => c.String(maxLength: 100, unicode: false));
        }
    }
}
