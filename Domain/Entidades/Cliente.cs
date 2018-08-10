using Domain.Entidades;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Domain.Models
{
    public class Cliente : Entity
    {

        public string MacAdress { get; set; }

        public string Nome { get; set; }

        public string Cep { get; set; }

        public string Endereco { get; set; }

        public string Cidade { get; set; }

        public EstadosUF Estado { get; set; }

        public double Sinal1 { get; set; }

        public double Sinal2 { get; set; }

    }
}