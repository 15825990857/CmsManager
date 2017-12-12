using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace CmsManager.Common
{
   public class BaseFilterAttribute: ActionFilterAttribute
    {
        public IServiceProvider ServiceProvider
        {
            get;
            set;
        }
    }
}
