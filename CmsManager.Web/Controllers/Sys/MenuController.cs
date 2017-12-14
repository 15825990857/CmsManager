﻿
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
    public class MenuController : Controller
    {
        public IMenuBLL IMenuBLL { get; set; }
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
            Menu menu = new Menu();
            menu.Parent = (int)ids;
            return View("Edit",menu);
        }
        public ActionResult Edit(int ids)
        {
            return View();
        }

        public void Bind()
        {
            ViewData["Type"]= "";
        }
    }
}