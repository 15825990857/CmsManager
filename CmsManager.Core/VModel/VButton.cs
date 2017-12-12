using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.VModel
{
  public  class VButton
    {
        /// <summary>
        /// 显示名称
        /// </summary>
        public string text { get; set; }
        /// <summary>
        /// 样式
        /// </summary>
        public string style { get; set; }
        /// <summary>
        /// 事件
        /// </summary>
        public string click { get; set; }
    }
}
