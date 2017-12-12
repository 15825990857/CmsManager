using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CmsManager.Common
{
   public class Encrypt
    {
        #region 全局变量
        protected static string Key = "";
        #endregion

        #region 方法

        #region MD5加密

        #region MD5加密 16位
        /// <summary>
        /// MD5加密 16位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string EncryptMD5By16(string str)
        {
            return str;
        }
        #endregion

        #region MD5加密 32位
        /// <summary>
        /// MD5加密 32位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string EncryptMD5By32(string str)
        {
            string pwd = "";
            MD5 md5 = MD5.Create();//实例化一个md5对像
            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择 
            byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(str));
            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < s.Length; i++)
            {
                // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符 

                pwd = pwd + s[i].ToString("X");

            }
            return pwd;
        }
        #endregion

        #region MD5解密 16位
        /// <summary>
        /// MD5解密 16位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string DecryptMD5By16(string str)
        {
            return str;
        }
        #endregion

        #region MD5解密 32位
        /// <summary>
        /// MD5解密 32位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string DecryptMD5By32(string str)
        {
            return str;
        }
        #endregion

        #endregion

        #region DES加密

        #region DES加密 16位
        /// <summary>
        /// DES加密 16位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string EncryptDESBy16(string str)
        {
            return str;
        }
        #endregion

        #region DES加密 32位
        /// <summary>
        /// DES加密 32位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string EncryptDESBy32(string str)
        {
            return str;
        }
        #endregion

        #region DES解密 16位
        /// <summary>
        /// DES解密 16位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string DecryptDESBy16(string str)
        {
            return str;
        }
        #endregion

        #region DES解密 32位
        /// <summary>
        /// DES解密 32位
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string DecryptDESBy32(string str)
        {
            return str;
        }
        #endregion

        #endregion

        #endregion
    }
}
