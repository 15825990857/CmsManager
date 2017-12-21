using CmsManager.Core.Model;
using CmsManager.Core.VModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Data
{
    public class DbBaseContext:DbContext
    {
        static DbBaseContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<DbBaseContext>());
        }
        public DbBaseContext():base("BaseContext")
        {
            
        }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<UserAdminLog> UserAdminLog { get; set; }
        public DbSet<Button> Button { get; set; }
        public DbSet<UserMenu> UserMenu { get; set; }
        public DbSet<SysOperateLog> SysOperateLog { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            var all = Assembly.GetExecutingAssembly();
            modelBuilder.Configurations.AddFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
