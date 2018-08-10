using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Domain.Models;
using Infra.EntityConfig;

namespace Infra.Models
{
    public class Contexto : DbContext
    {
        public Contexto() :base("ProjectAlertTVMVC") { }
       
        public DbSet<Cliente> Clientes {get; set;}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder
                .Properties()
                .Where(p => p.Name == "Id")
                .Configure(p => p.IsKey());

            modelBuilder
                .Properties()
                .Where(p => p.Name == "RowVersion")
                .Configure(p => p.IsRowVersion());

            modelBuilder
                .Properties()
                .Where(p => p.Name == "RowVersion")
                .Configure(p => p.IsConcurrencyToken());

            modelBuilder
                .Properties<string>()
                .Configure(p => p.HasColumnType("varchar"));

            modelBuilder
                .Properties<string>()
                .Configure(p => p.HasMaxLength(100));

            modelBuilder.Configurations.Add(new ClienteConfig());
            base.OnModelCreating(modelBuilder);
        }
       
    }
}