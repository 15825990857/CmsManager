using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Model
{
   public class Role
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
