using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using CmsManager.@enum;
using CmsManager.IBLL;
using CmsManager.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CmsManager.Web.Controllers
{
    public class HomeController : BaseicController
    {
       public IMenuBLL _IMenuBLL { get; set; }
       public IButtonBLL _IButtonBLL { get; set; }
       public IUserMenuBLL _IUserMenuBLL { get; set; }

        // GET: Home
        public ActionResult Index()
        {
          List<VMenu> list = _IMenuBLL.GetOneMenu();
            ViewBag.MenuOneList = list;
            return View();
        }

        public JsonResult GetChildByid(int id)
        {
            var model = _IMenuBLL.GetById(id);
            string url = (model.Controller == "" || model.Controller == null) ? "" : "/" + model.Controller + "/" + model.Action;
            VMenu v = new VMenu() { id = id.ToString(), icon = "", menuName = model.Text, parentid = model.Parent.ToString(), url = url };
            var list = _IMenuBLL.GetChildMenu(v);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetButtons(string controller, string action)
        {
            List<VButton> button = new List<VButton>();
            try
            {
                var buttonList = _IButtonBLL.GetALL();
                var roleList = _IUserMenuBLL.GetALL(p => p.UserID == 1005);
                var model = _IMenuBLL.GetALL(p => p.Controller.Equals(controller) && p.Action.Equals(action)).First();
                var menuList = _IMenuBLL.GetALL(a => a.type == (int)@enum.Button.button && a.Parent == model.ID && a.Status == (int)Status.Start);
                var list = new List<Menu>();
                list = menuList.OrderBy(a => a.Index).ToList();
                //(from a in menuList join b in roleList on a.ID equals b.MenuID select a).OrderBy(a => a.Index).ToList();

                foreach (var item in list)
                {
                    VButton v = new VButton();
                    v.text = item.Text;
                    v.style = buttonList.FirstOrDefault(a => a.ID.Equals(item.Click)).Icon;
                    v.click = buttonList.FirstOrDefault(a => a.ID.Equals(item.Click)).Click;
                    button.Add(v);
                }
                return PartialView(button);

            }
            catch (Exception)
            {
                return PartialView(button);
            }
        }

        public ActionResult GetEditButton()
        {
            return PartialView();
        }

        public ActionResult DeskTop()
        {
            return View();
        }
    }
}