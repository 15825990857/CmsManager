using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.VModel
{
  public  class VMenu
    {
        public string menuName { get; set; }
        public string url { get; set; }
        public string id { get; set; }
        public string parentid { get; set; }
        public string icon { get; set; }
        public List<VMenu> subMenu { get; set; }
    }
}
