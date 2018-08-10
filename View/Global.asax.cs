using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace View
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {

            ViewEngines.Engines.Clear();
            CustomViewEngine engine = new CustomViewEngine();
            // Add a shared location too, as the lines above are controller specific
            engine.AddPartialViewLocationFormat("~/Views/Layouts/{0}.cshtml");
            ViewEngines.Engines.Add(engine);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
