using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TesteJSONxNET.WebForms;
using Service.Services;
using Service.Exceptions;
using System.Web.Routing;
using Domain.Auxiliares;
using System.Collections.Generic;
using View.Helpers;

namespace View.Controllers
{
    public class IndexController : ControllerDefault
    {
        /// <summary>
        /// 
        /// </summary>
        public ClienteService ClienteService { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public SinalService SinalService { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestContext"></param>
        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);
            ClienteService = new ClienteService();
            SinalService = new SinalService();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="itensPerPage"></param>
        /// <returns></returns>
        public ActionResult Index(string searchTerm = "", int page = 1, int itensPerPage = 12)
        {
            try
            {
                ViewBag.ClientesPaginator = ClienteService.PaginateAll(searchTerm, page, itensPerPage);
                ViewBag.SearchTerm = searchTerm;
                ViewBag.Title = "Dashboard";
                return View();
            }
            catch (AppException e)
            {
                return View();
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Readme()
        {
            ViewBag.Title = "Readme";
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Contact()
        {
            ViewBag.Title = "Contato";
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Macs"></param>
        /// <returns></returns>
        public JsonResult GetSinal(List<Dictionary<string,string>> Macs)
        {
            try
            {
                return GetJsonResult(new
                {
                    status = "success",
                    data = SinalService.GetSinalsOfClients(Macs)
                });
            }
            catch (Exception e)
            {
                return GetJsonResult(new
                {
                    status = "error"
                });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mac"></param>
        /// <returns></returns>
        public JsonResult GetLast60Days(string mac = "", string dataInicio = "", string dataFim = "")
        {
            try
            {
                return GetJsonResult(new
                {
                    status = "success",
                    data = SinalService.GetLast60Days(mac, dataInicio, dataFim)
                });
            }
            catch (AppException e)
            {
                return GetJsonResult(new
                {
                    status = "error"
                });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            base.OnResultExecuting(filterContext);
            ClienteService.Dipose();
        }
        
    }
}