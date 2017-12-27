using CmsManager.Common;
using CmsManager.Core.VModel;
using Newtonsoft.Json;
using SixCom.Core.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers
{
    
    public class BaseicController : BaseController
    {
        protected UserAdmin UserAdmin;
        public BaseicController()
        {
            checkOut();
        }
        /// <summary>
        /// 判断是否登陆
        /// </summary>
        private void checkOut()
        {
            try
            {
                UserAdmin = JsonConvert.DeserializeObject<UserAdmin>(Cookie.GetCookie("UserAdmin"));
                var model = OnLineUser.OnLineList.FirstOrDefault(p => p.UserID ==UserAdmin.UserID);
                if (model == null)
                {
                    if (model == null)
                    {
                        RedirectUrl("/Login/Error?str=" + "您的账号在别的地方登录，您已被迫下线，是否重新登录！");
                    }
                }
            }
            catch (Exception e)
            {
                RedirectUrl("/Login/Error?str=" + e.Message + "，请重新登录！");
            }

        }

        public void RedirectUrl(string url)
        {
            System.Web.HttpContext.Current.Response.Clear();
            System.Web.HttpContext.Current.Response.BufferOutput=true;
            if (!System.Web.HttpContext.Current.Response.IsRequestBeingRedirected)
            {
                System.Web.HttpContext.Current.Response.Redirect(url);
            }
        }

      
    }
}