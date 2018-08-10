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
using ProjectAlertTVMVC.Helpers;

namespace ProjectAlertTVMVC.Controllers
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
        public ActionResult Index(int page = 1, int itensPerPage = 12)
        {
            try
            {
                ViewBag.ClientesPaginator = ClienteService.PaginateAll(currentPage: page, itenPerPage:itensPerPage);
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
            ViewBag.Message = "Your application description page.";
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
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
        /// <param name="filterContext"></param>
        protected override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            base.OnResultExecuting(filterContext);
            ClienteService.Dipose();
        }
        
    }
}