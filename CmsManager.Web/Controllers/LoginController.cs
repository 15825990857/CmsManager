using CmsManager.BLL;
using CmsManager.Common;
using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using CmsManager.Data;
using CmsManager.@enum;
using CmsManager.IBLL;
using CmsManager.IBLL.logger;
using Newtonsoft.Json;
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
        public ISysOpertorLogBLL ISysOpertorLogBLL { get; set; }
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
                    OnLineUser.OnLineList.Add(new OnLineUser() { SessionID = Session.SessionID, UserID = user.ID });
                    SetCookieUser(user, userName, password, isCheck);
                    SysOperateLog log = new SysOperateLog();
                    log.ActionName = "Login";
                    log.ControllerName = "Login";
                    log.CreateTime = DateTime.Now;
                    log.OperatorIP = IPHelper.GetIP();
                    log.OperatorType = (int)Log.Login;
                    log.Operator_Name = userName;
                    log.Operator_UserId = user.ID;
                    ISysOpertorLogBLL.Insert(log);
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
            UserAdmin us = new UserAdmin()
            {
                UserID = user.ID,
                RealName = user.UserName,
                SessionID = Session.SessionID
            };
            Cookie.WriteCookie("UserAdmin", JsonConvert.SerializeObject(us), dt);
            Cookie.WriteCookie("SessionID", Session.SessionID);
            
        }

        public ActionResult Error(string str)
        {
            //Cookie.DeleteCookie("UserAdmin");
            //Cookie.DeleteCookie("SessionID");

            ViewBag.ErrorStr = str;
            return View();
        }
    }
}