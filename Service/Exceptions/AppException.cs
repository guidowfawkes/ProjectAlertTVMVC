using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Exceptions
{
    public class AppException : Exception
    {

        public string Msg { get; set; }

        public string MsgTecnica { get; set; }

        public AppException(string msg, string msgTecnica) : base(msg)
        {
            Msg = msg;
            MsgTecnica = msgTecnica;
        }

    }
}
