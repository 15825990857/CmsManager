using CmsManager.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Mapping
{
   public class UserMapping:EntityTypeConfiguration<User>
    {
        public UserMapping()
        {
            this.HasKey(p => p.ID);
            this.Property(p => p.UserName).HasMaxLength(100).IsRequired();
            this.Property(p => p.Pwd).HasMaxLength(100).IsRequired();
        }
    }
}
