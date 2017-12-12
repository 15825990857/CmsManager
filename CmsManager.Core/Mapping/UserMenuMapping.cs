using CmsManager.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Mapping
{
  public  class UserMenuMapping:EntityTypeConfiguration<UserMenu>
    {
        public UserMenuMapping()
        {
            this.HasKey(p => p.ID);
        }
    }
}
