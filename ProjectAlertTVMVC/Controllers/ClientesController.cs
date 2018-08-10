using Infra.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TesteJSONxNET.WebForms;
using Service.Services;
using System.Web.Routing;
using Service.Exceptions;
using Domain.Models;
using ProjectAlertTVMVC.Helpers;

namespace ProjectAlertTVMVC.Controllers
{
    public class ClientesController : ControllerDefault
    {
        public ClienteService ClienteService { get; set; }

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);
            ClienteService = new ClienteService();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searching"></param>
        /// <param name="page"></param>
        /// <param name="itensPerPage"></param>
        /// <returns></returns>
        public ActionResult Index(string searching = "", int page = 1, int itensPerPage = 12)
        {
            try
            {
                ViewBag.ClientesPaginator = ClienteService.PaginateAll(searching, page, itensPerPage);
            }
            catch (AppException e)
            {

            }
            return View();
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult OpenSave(long id = 0)
        {
            try
            {
                Cliente clienteEncontrado = new Cliente();
                if (id > 0)
                {
                    clienteEncontrado = ClienteService.FindById(id);
                }
                ViewBag.Cliente = clienteEncontrado;
                return View();
            }
            catch (AppException e)
            {
                throw e;
            }
        } 

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cliente"></param>
        /// <returns></returns>
        public JsonResult Save(Cliente cliente)
        {
            try
            {
                ClienteService.Salvar(cliente);
                return GetJsonResult(new
                {
                    status = "success",
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
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Delete(long id)
        {
            try
            {
                ClienteService.Delete(id);
                return Redirect("Index", new { controller = "Clientes" });
            }
            catch (AppException e)
            {
                throw e;
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
