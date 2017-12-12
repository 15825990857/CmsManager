using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Owin;
using Microsoft.Owin;
using SixCom.Core.Dependency;
using SixCom.Core.Mvc;
using CmsManager.Web;

[assembly: OwinStartup(typeof(Startup))]
namespace CmsManager.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //获取服务列表
            IServicesBuilder builder = new ServicesBuilder();
            IServiceCollection services = builder.Build();

            IIocBuilder mvcIocBuilder = new MvcAutofacIocBuilder(services);
            app.UseSixComMvc(mvcIocBuilder);

        
        }
    }
}