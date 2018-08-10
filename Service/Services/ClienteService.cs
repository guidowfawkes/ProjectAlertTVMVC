using Domain.Helpers;
using Domain.Models;
using Infra.Daos;
using Infra.Models;
using Service.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Service.Services
{
    public class ClienteService
    {

        public ClienteDAO Dao { get; set; }

        public ClienteService(Contexto context = null)
        {
            Dao = new ClienteDAO(context);
        }

        public Paginator<Cliente> PaginateAll(string searchTerm = "", int currentPage = 1, int itenPerPage = 30)
        {
            try
            {
                return Dao.PaginateAll(searchTerm, currentPage, itenPerPage);
            }
            catch (Exception e)
            {
                throw new AppException("Erro ao selecionar o cliente!", e.StackTrace);
            }
        }

        public Cliente FindById(long id)
        {
            return Dao.FindById(id);
        }

        public void Salvar(Cliente cliente)
        {
            try
            {
                if(cliente == null)
                {
                    throw new Exception("Cliente Inválido!");
                }

                using (TransactionScope scope = new TransactionScope())
                {
                    if (cliente.Id > 0)
                    {
                        var clienteAntigo = Dao.FindByIdWithNoTracking(cliente.Id);
                        if (clienteAntigo.MacAdress != cliente.MacAdress)
                        {
                            throw new Exception("O MacAddress não pode ser alterado!");
                        }
                        Dao.Update(cliente);
                    }
                    else
                    {
                        Dao.Save(cliente);
                    }
                    scope.Complete();
                }
            }
            catch (Exception e)
            {
                throw new AppException("Erro ao salvar o cliente!", e.StackTrace);
            }
        }

        public void Delete(long id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new Exception("Id inválido!");
                }

                using (TransactionScope scope = new TransactionScope())
                {
                    Dao.RemoveById(id);
                    scope.Complete();
                }
            }
            catch (Exception e)
            {
                throw new AppException("Erro ao remover o cliente!", e.StackTrace);
            }
        }

        public void Dipose()
        {
            Dao.Dispose();
        }

    }
}
