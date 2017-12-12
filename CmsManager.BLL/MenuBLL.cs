using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using CmsManager.@enum;
using CmsManager.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.BLL
{
  public  class MenuBLL:BaseBLL<Menu>,IMenuBLL
    {
        /// <summary>
        /// 获取一级菜单
        /// </summary>
        /// <returns></returns>
        public List<VMenu> GetOneMenu()
        {
            List<Menu> listAll = new List<Menu>();
            var list =new  List<VMenu>();
            listAll=GetALL(o => o.Status ==(int)Status.Start&&o.type==(int)@enum.Button.menu&&o.Parent==0).OrderBy(p=>p.Index).ToList();
            foreach (var item in listAll)
            {
                VMenu m = new VMenu();
                m.id = item.ID.ToString();
                m.menuName = item.Text;
                m.url = (item.Controller == "" || item.Controller == null) ? "" : "/" + item.Controller + "/" + item.Action;
                m.icon = "";
                m.parentid = item.Parent.ToString();
                list.Add(m);
            }
            return list;
        }

        public List<VMenu> GetChildMenu(VMenu vMenu)
        {
            List<Menu> list = new List<Menu>();
             
                list = GetALL(a => a.Status == (int)Status.Start && a.type == (int)@enum.Button.menu).OrderBy(a => a.Index).ToList();
             
            List<VMenu> menuList = new List<VMenu>();
            foreach (var item in list)
            {
                VMenu m = new VMenu();
                m.id = item.ID.ToString();
                m.menuName = item.Text;
                m.url = (item.Controller == "" || item.Controller == null) ? "" : "/" + item.Controller + "/" + item.Action;
                m.icon ="";
                m.parentid = item.Parent.ToString();
                menuList.Add(m);
            }
            return CreateChildTree(menuList, vMenu);
        }

        /// <summary>
        /// 递归子节点
        /// </summary>
        /// <param name="TreeList"></param>
        /// <param name="jt"></param>
        /// <returns></returns>
        public List<VMenu> CreateChildTree(List<VMenu> TreeList, VMenu jt)
        {
            string keyid = jt.id;//根节点ID
            List<VMenu> nodeList = new List<VMenu>();
            var children = TreeList.Where(t => t.parentid == keyid);
            foreach (var chl in children)
            {
                VMenu node = new VMenu();
                node.id = chl.id;
                node.menuName = chl.menuName;
                node.parentid = chl.parentid;
                node.url = chl.url;
                node.icon = chl.icon;
                node.subMenu = CreateChildTree(TreeList, node);
                nodeList.Add(node);
            }
            return nodeList;
        }
    }
}
