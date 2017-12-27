
using CmsManager.Common;
using CmsManager.Core.Model;
using CmsManager.@enum;
using CmsManager.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers.Sys
{
    public class MenuController : BaseicController
    {
        public IMenuBLL IMenuBLL { get; set; }
        public IButtonBLL IButtonBLL { get; set; }
        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getList()
        {
            var list=IMenuBLL.GetALL(a=>a.Status!=(int)Status.Del).OrderBy(p=>p.Index).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult MenuList()
        {
            return View();
        }

        public ActionResult Add(int ids)
        {
            Bind();
            Menu menu = new Menu();
            menu.Parent = (int)ids;
            return View("Edit",menu);
        }
        public ActionResult Edit(int ids)
        {
            Bind();
         var model= IMenuBLL.GetById(ids);
            return View(model);
        }

        [HttpPost]
        public JsonResult Edit(Menu menu)
        {
            int result = 0;
            if (menu.ID != 0)
            {
                menu.CreateTime = DateTime.Now;
               result=IMenuBLL.Update(menu);
                
            }
            else
            {
                menu.CreateTime = DateTime.Now;
            var model=IMenuBLL.InsertToEntity(menu);
                result = model.ID;  
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Del(int id)
        {
            var model = IMenuBLL.Delete(id);
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public void Bind()
        {
            ViewData["Type"] = EnumKit.ToSelectListByDesc(typeof(@enum.Button));
            ViewData["Status"] = new List<SelectListItem>() { new SelectListItem() { Text = "启用", Value = "2" }, new SelectListItem() { Text = "停用", Value = "3" } };
            ViewData["Click"] = IButtonBLL.GetALL().Select(a => new SelectListItem { Text = a.Text, Value = a.ID.ToString() });
        }
    }
}