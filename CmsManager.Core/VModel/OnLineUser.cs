using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.VModel
{
   public class OnLineUser
    {
        public Guid ID { get; set; }
        public int UserID { get; set; }
        public string  SessionID { get; set; }
        public static List<OnLineUser> OnLineList = new List<OnLineUser>();
    }
}
