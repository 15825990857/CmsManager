﻿using CmsManager.BLL;
using CmsManager.Common;
using CmsManager.Core.Model;
using CmsManager.Data;
using CmsManager.IBLL;
using SixCom.Core.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers
{
    public class LoginController : BaseController
    {
        public IUserBLL _User_BLL { get; set; }
        // GET: Login
        public ActionResult Index()
        { 
            return View();
        }

        /// <summary>
        /// 验证登陆
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="isCheck"></param>
        /// <param name="validCode"></param>
        /// <returns></returns>
        public JsonResult Login(string userName,string password, bool isCheck, string validCode)
        {
            string result = "";
            if (Cookie.GetCookie("CheckCode").ToLower() != validCode.ToLower())
            {
                result = "-1";
            }
            else
            {
                var pwd = Encrypt.EncryptMD5By32(password);
                var user = _User_BLL.LoginOK(userName, Encrypt.EncryptMD5By32(password));
                if (user == null)
                {
                    result = "用户名或密码错误！";
                }
                else
                {
                    result = "1";
                    SetCookieUser(user, userName, password, isCheck);
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
 
        /// <summary>
        /// 设置登录cookie
        /// </summary>
        /// <param name="user"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="isCheck"></param>
        public void SetCookieUser(User user,string userName,string password,bool isCheck)
        {
            DateTime dt = DateTime.Now.AddDays(1);
            if (isCheck)
            {
                DateTime dts = DateTime.Now.AddDays(15);
                Cookie.WriteCookie("username", userName, dts);
                Cookie.WriteCookie("password", password, dts);
                Cookie.WriteCookie("isCheck", "1", dts);
            }
            else
            {
                Cookie.DeleteCookie("username");
                Cookie.DeleteCookie("password");
                Cookie.DeleteCookie("isCheck");
            }
        }
    }
}