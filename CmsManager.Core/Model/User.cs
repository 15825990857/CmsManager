using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Model
{
   public class User
    {
        public int ID { get; set; }
        public string  UserName { get; set; }
        public string Pwd { get; set; }
        public DateTime CreateTime { get; set; }
        public int Status { get; set; }
    }
}
