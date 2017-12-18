using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Model
{
 public   class SysOperateLog
    {
        public int　ID { get; set; }
        public string  ActionName { get; set; }
        public string  ControllerName { get; set; }
        public int Operator_UserId { get; set; }
        public string Operator_Name { get; set; }
        public string　OperatorIP { get; set; }
        public int OperatorType { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
