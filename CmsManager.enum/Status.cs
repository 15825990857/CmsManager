using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.@enum
{
   public  enum Status
    {
        /// <summary>
        /// 暂存
        /// </summary>
        [Description("暂存")]
        Temporary = 1,
        /// <summary>
        /// 启用
        /// </summary>
        [Description("启用")]
        Start = 2,
        /// <summary>
        ///停用
        /// </summary>
        [Description("停用")]
        Disable = 3,
        /// <summary>
        /// 删除
        /// </summary>
        [Description("删除")]
        Del = 4
    }
}
