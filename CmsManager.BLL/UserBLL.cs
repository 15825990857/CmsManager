using CmsManager.BLL;
using CmsManager.Core.Model;
using CmsManager.@enum;
using CmsManager.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.BLL
{
   public class UserBLL: BaseBLL<User>,IUserBLL
    {

       
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="LoginName">用户名</param>
        /// <param name="pwd">密码</param>
        /// <returns></returns>
        public User LoginOK(string LoginName, string pwd)
        {
          return dbSet.FirstOrDefault(p => p.UserName.Equals(LoginName) && p.Pwd.Equals(pwd)&&p.Status==(int)Status.Start);
        }
         
      
    }
}
