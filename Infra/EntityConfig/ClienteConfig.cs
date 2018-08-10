using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;
using Domain.Models;

namespace Infra.EntityConfig
{
    public class ClienteConfig : EntityTypeConfiguration<Cliente>
    {

        public ClienteConfig()
        {

            Property(c => c.MacAdress)
                .IsRequired();

            Property(c => c.Nome)
                .IsRequired();

            Property(c => c.Cep)
                .IsRequired();

            Property(c => c.Endereco)
                .IsRequired();

            Property(c => c.Cidade)
                .IsRequired();

            Property(c => c.Estado)
                .IsRequired();

        }

    }
}
