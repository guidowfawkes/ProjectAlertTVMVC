using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace View.Helpers
{
    public class ControllerDefault : Controller
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestContext"></param>
        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            base.OnResultExecuting(filterContext);
        }

        /// <summary>
        ///     Serializa um objeto Json, para ser enviado para a view.
        ///     Muito usado quando a view utiliza javascript para manipular esse Json.
        /// </summary>
        /// <param name="obj">
        ///     Objeto Json a ser serializado.
        /// </param>
        /// <returns>
        ///     String de serialização do json.
        /// </returns>
        protected string GetJsonSerialize(object obj)
        {
            return JsonConvert.SerializeObject(obj, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    MaxDepth = 2,
                    NullValueHandling = NullValueHandling.Ignore,
                    MissingMemberHandling = MissingMemberHandling.Ignore,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }

        /// <summary>
        ///     Padroniza o objeto json enviado, para ter um tamanho adequado a aplicação. 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="mensagens"></param>
        /// <returns>
        ///     Objeto Json a ser enviado.
        /// </returns>
        protected JsonResult GetJsonResult(object obj)
        {
            JsonResult result = Json(GetJsonSerialize(obj), JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 999999999;
            return result;
        }

        protected RedirectToRouteResult Redirect(string action, object routeParams)
        {
            return RedirectToAction(action, routeParams);

        }

    }
}