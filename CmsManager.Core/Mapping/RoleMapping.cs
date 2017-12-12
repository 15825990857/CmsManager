using CmsManager.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Mapping
{
   public class RoleMapping: EntityTypeConfiguration<Role>
    {
        public RoleMapping()
        {
            this.HasKey(p => p.ID);
            this.Property(p => p.Name).HasMaxLength(100).IsRequired();
        }

    }
}
