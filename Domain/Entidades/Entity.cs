using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entidades
{
    public class Entity
    {
        public long Id { get; set; }

        public byte[] RowVersion { get; set; } 

    }
}
