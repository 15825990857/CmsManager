
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Data
{
    public class DefaultDbContextFactory
    {
        //确保Context 对象唯一，防止高并发

        private static object DBLock = new object();

        public static DbContext GetCurrentDbContext()
        {
            DbContext dbContext = CallContext.GetData("DbContext") as DbContext;

            if (dbContext == null)
            {
                dbContext = new DbBaseContext();
                CallContext.SetData("DbContext", dbContext);
            }
            return dbContext;
        }

        public static int SaveChanges()
        {
            return DefaultDbContextFactory.GetCurrentDbContext().SaveChanges();
        }

    }
}
