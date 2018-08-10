using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;
  
namespace TesteJSONxNET.WebForms
{
    public static class JSONHelper
    {
        public static string GetJSONString(string url)
        {
            HttpWebRequest request =
                (HttpWebRequest)WebRequest.Create(url);
            WebResponse response = request.GetResponse();
  
            using (Stream stream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(
                    stream, Encoding.UTF8);
                return reader.ReadToEnd();
            }
        }
    }
}