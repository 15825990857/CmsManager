using CmsManager.BLL;
using CmsManager.Core.Model;
using CmsManager.@enum;
using CmsManager.IDAL;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.DAL
{
    //[Register(typeof(IDAL.IUSerDAL))]
    public class UserDAL: BaseBLL<User>,IDAL.IUSerDAL
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="LoginName">用户名</param>
        /// <param name="pwd">密码</param>
        /// <returns></returns>
        public User LoginOK(string LoginName, string pwd)
        {
            return dbSet.FirstOrDefault(p => p.UserName.Equals(LoginName) && p.Pwd.Equals(pwd) && p.Status == (int)Start.Effective);
        }
    }
}
