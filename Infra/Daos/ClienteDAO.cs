using Domain.Helpers;
using Domain.Models;
using Infra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Daos
{
    public class ClienteDAO : CrudDAO<Cliente>
    {
        public ClienteDAO(Contexto context = null) : base(context) { }

        public Paginator<Cliente> PaginateAll(string searchTerm = "", int currentPage = 1, int itenPerPage = 30)
        {
            var query = DbSet
                .Select(c => c);

            if(!string.IsNullOrEmpty(searchTerm)) {
                query = query.Where(c => c.Nome.Contains(searchTerm) 
                    || c.Endereco.Contains(searchTerm) 
                    || c.MacAdress.Contains(searchTerm)
                    || c.Cidade.Contains(searchTerm));
            }

            var clientesList = query
                .OrderBy(c => c.Nome)
                .Skip((currentPage - 1) * itenPerPage)
                .Take(itenPerPage)
                .ToList();

            var count = query.Count();

            return new Paginator<Cliente>(clientesList, count, currentPage, itenPerPage);
        }
    }
}
