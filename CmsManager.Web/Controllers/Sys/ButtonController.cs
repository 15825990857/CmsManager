using CmsManager.Core.Model;
using CmsManager.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers.Sys
{
    public class ButtonController : Controller
    {
        public IButtonBLL IButtonBLL { get; set; }
        // GET: Button
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取按钮列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetList()
        {
            var model = IButtonBLL.GetALL();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

         [HttpGet]
        public ActionResult Edit()
        {
            return View();
        }

       [HttpPost]
        public JsonResult Edit(Button button)
        {
            int result = 0;
            if (button.ID == 0)
            {
                result=IButtonBLL.Insert(button);
            }
            else
            {
              result=IButtonBLL.Update(button);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}