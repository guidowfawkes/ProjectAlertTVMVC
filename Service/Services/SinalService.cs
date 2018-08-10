using Domain.Auxiliares;
using Service.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TesteJSONxNET.WebForms;

namespace Service.Services
{
    public class SinalService
    {

        public List<DashboardFilter> GetSinalsOfClients(List<Dictionary<string,string>> Macs)
        {
            try
            {

                if (Macs == null || Macs.Count <= 0)
                {
                    throw new Exception("Endereco mac inválido");
                }

                List<DashboardFilter> retornos = new List<DashboardFilter>();
                foreach (var item in Macs)
                {
                    var id = item["Id"];
                    var mac = item["Mac"];
                    var retorno = new DashboardFilter()
                    {
                        Id = Convert.ToInt64(id),
                        Mac = mac
                    };

                    try
                    {
                        retorno.Retorno = JSONHelper.GetJSONString("http://apiniveldesinais.azurewebsites.net/api/sinais/" + mac);
                    }
                    catch (Exception e)
                    {
                        retorno.Erro = true;
                    }
                    retornos.Add(retorno);
                }

                return retornos;
            }
            catch (Exception  e)
            {
                throw new AppException("Erro ao obter os sinais do usuario!", e.StackTrace);
            }
        }

        public string GetLast60Days(string mac, string dataInicio = "", string dataFim = "")
        {
            try
            {
                if (string.IsNullOrEmpty(mac))
                {
                    throw new Exception("Mac inválido!");
                }

                DateTime df, di;
                if (string.IsNullOrEmpty(dataInicio) || string.IsNullOrEmpty(dataFim))
                {
                    df = DateTime.Today;
                    di = df.AddDays(-20);
                }
                else
                {
                    df = Convert.ToDateTime(dataFim);
                    di = Convert.ToDateTime(dataInicio);
                }

                return JSONHelper.GetJSONString("http://apiniveldesinais.azurewebsites.net/api/sinais/" 
                    + mac
                    + "/filter?dataIni=" + di.ToString("yyyy-MM-dd")
                    + "&dataFim=" + df.ToString("yyyy-MM-dd"));

            }
            catch (Exception e)
            {
                throw new AppException("Erro ao obter os sinais dos ultimos 60 dias!", e.StackTrace);
            }
        }
    }
}
