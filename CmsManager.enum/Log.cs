using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.@enum
{
    public enum Log
    {
        /// <summary>
        /// 登录
        /// </summary>
        [Description("登录")]
        Login = 1,
        /// <summary>
        /// 添加
        /// </summary>
        [Description("添加")]
        Add = 2,
        /// <summary>
        /// 修改
        /// </summary>
        [Description("修改")]
        Update = 3,
        /// <summary>
        /// 删除
        /// </summary>
        [Description("删除")]
        Delete = 4,
    }
}
