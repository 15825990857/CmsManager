using CmsManager.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Core.Mapping
{
   public class ButtonMapping:EntityTypeConfiguration<Button>
    {
        public ButtonMapping()
        {
            this.HasKey(p => p.ID);
            this.Property(p => p.Text).HasMaxLength(50).IsRequired();
        }
    }
}
