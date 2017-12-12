using CmsManager.Core.VModel;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Mapping
{
  public   class UserAdminLogMapping:EntityTypeConfiguration<UserAdminLog>
    {
        public UserAdminLogMapping()
        {
            this.HasKey(p => p.Id); 
        }
    }
}
