using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.@enum
{
    public enum Start
    {
        /// <summary>
        /// 用户有效状态
        /// </summary>
        [Description("有效")]
        Effective=1,

        /// <summary>
        /// 用户无效状态
        /// </summary>
         [Description("无效")]
        invalid=0
    }
}
