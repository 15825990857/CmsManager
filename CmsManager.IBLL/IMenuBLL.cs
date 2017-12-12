using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using SixCom.Core.Dependency;
using SixCom.Core.Ioc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.IBLL
{
  public  interface IMenuBLL: IBusinessLayer<Menu>, IScopeDependency
    {
        List<VMenu> GetOneMenu();
        List<VMenu> CreateChildTree(List<VMenu> TreeList, VMenu jt);
       List<VMenu> GetChildMenu(VMenu vMenu);
    }
}
