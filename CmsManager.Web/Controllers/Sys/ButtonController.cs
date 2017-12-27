using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using CmsManager.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers.Sys
{
    public class ButtonController : BaseicController
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
        public JsonResult GetList(DataTablesParameters dtp)
        {
            Expression<Func<Button, bool>> where = a => a.ID != 0;
            int total = 0;
            var list = IButtonBLL.GetALL(dtp.Start, dtp.Length, out total, where, dtp.OrderBy, dtp.OrderDir.ToString());
            var griddata = new { draw = dtp.Draw, recordsTotal = total, recordsFiltered = total, data = list };

            return Json(griddata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add()
        {
            return View("Edit", new Button());
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
              var model=IButtonBLL.InsertToEntity(button);
                result = model.ID;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}