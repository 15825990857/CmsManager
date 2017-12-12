using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Model
{
    public class Menu
    {
        public int　ID { get; set; }
        public string  Text { get; set; }
        public string  Controller { get; set; }
        public string Action { get; set; }
        public int Index { get; set; }
        public int Status { get; set; }
        public int type { get; set; }
        public int Parent { get; set; }
        public string  Icon { get; set; }
        public int Click { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
