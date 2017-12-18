using CmsManager.Core.Model;
using SixCom.Core.Dependency;
using SixCom.Core.Ioc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.IBLL.logger
{
  public  interface ISysOpertorLogBLL: IBusinessLayer<SysOperateLog>, IScopeDependency
    {
    }
}
