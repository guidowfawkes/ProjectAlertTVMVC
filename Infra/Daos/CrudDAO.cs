using Domain.Entidades;
using Infra.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Daos
{
    public abstract class CrudDAO<T> where T:Entity, new()
    {
        public Contexto Db { get; set; }

        public DbSet<T> DbSet { get; set; }

        public CrudDAO(Contexto contextoAtual = null)
        {
            if (contextoAtual == null)
            {
                contextoAtual = new Contexto();
            }
            Db = contextoAtual;
            DbSet = Db.Set<T>();
        }

        /// <summary>
        ///     Salva os dados o estado do Db no banco de dados. 
        ///     Essa forma de salvar, trata as exeções possíveis.
        /// </summary>
        public virtual void SaveChanges()
        {
            try
            {
                Db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entidade do tipo \"{0}\" no estado \"{1}\" tem os seguintes erros de validação:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Erro: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }

        /// <summary>
        ///     Disconecta do contexto do banco de dados em questão.
        /// </summary>
        public virtual void Dispose()
        {
            Db.Dispose();
            GC.SuppressFinalize(this);
        }

        /// <summary>
        ///     Busca o objeto no banco de dados, pelo Id desse objeto.
        /// </summary>
        /// <param name="id">
        ///     Id do objeto em questão.
        /// </param>
        /// <returns>
        ///     Obejto em questão.
        /// </returns>
        public virtual T FindById(long id)
        {
            return DbSet.FirstOrDefault(t => t.Id == id);
        }

        /// <summary>
        ///     Busca o objeto no banco de dados, pelo Id desse objeto. (Sem Referencia no Obj)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T FindByIdWithNoTracking(long id)
        {
            return DbSet.AsNoTracking().FirstOrDefault(t => t.Id == id);
        }

        /// <summary>
        ///     Salva no banco de dados mais especificamente na tabela referente a entidade enviada por paramentro
        /// </summary>
        /// <param name="obj">
        ///     objeto de uma entidade.
        /// </param>
        /// <returns>
        ///     Retorna o mesmo objeto armazenado.
        /// </returns>
        public virtual T Save(T obj)
        {
            if (obj.Id > 0)
            {
                return Update(obj);
            }
            var objAdd = DbSet.Add(obj);
            SaveChanges();
            return objAdd;
        }

        /// <summary>
        ///     Salva no banco de dados mais especificamente na tabela referente a entidade enviada por paramentro, um lote de dados.
        /// </summary>
        /// <param name="obj">
        ///     Lote de objetos de uma entidade.
        /// </param>
        /// <returns>
        ///     Retorna o mesmo lote armazenado.
        /// </returns>
        public virtual void SaveBach(IEnumerable<T> objs)
        {
            foreach (var obj in objs)
            {
                obj.Id = 0;
                Save(obj);
            }
            SaveChanges();
        }

        /// <summary>
        ///     Atualiza o banco de dados mais especificamente na tabela referente a entidade envia por parametro.
        /// </summary>
        /// <param name="obj">
        ///     Qualquer objeto que Extende a Classe Entity
        /// </param>
        /// <returns>
        ///     Retorna uma instancia do mesmo tipo que foi enviado
        /// </returns>
        public virtual T Update(T obj)
        {
            var entry = Db.Entry(obj);
            var attachedEntity = Db.ChangeTracker.Entries<T>().FirstOrDefault(e => e.Entity.Id == obj.Id);
            if (attachedEntity != null)
            {
                Db.Entry<T>(attachedEntity.Entity).State = EntityState.Modified;
            }
            else
            {
                DbSet.Attach(obj);
                entry.State = EntityState.Modified;
            }
            SaveChanges();
            return obj;
        }

        /// <summary>
        ///     Remove registro no banco de dados que contem o id informado, na tabela refente a entidade
        /// </summary>
        /// <param name="id">
        ///     Id do objeto que deseja remover
        /// </param>
        public virtual void RemoveById(long id)
        {
            DbSet.Remove(DbSet.Find(id));
            SaveChanges();
        }

        /// <summary>
        ///     Remove Varios Objetos pelo ID
        /// </summary>
        /// <param name="ids"></param>
        public virtual void RemoveRange(long[] ids)
        {
            foreach (var id in ids)
            {
                DbSet.Remove(DbSet.Find(id));
            }
            SaveChanges();
        }

        /// <summary>
        ///     Remove Varios Objetos
        /// </summary>
        /// <param name="obj"></param>
        public virtual void Remove(T obj)
        {
            DbSet.Remove(obj);
            SaveChanges();
        }

    }
}
