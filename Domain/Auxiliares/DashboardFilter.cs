using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Domain.Auxiliares
{
    public class DashboardFilter
    {

        public long Id { get; set; }

        public string Mac { get; set; }

        public string Retorno { get; set; }

        public bool Erro { get; set; }
    }
}