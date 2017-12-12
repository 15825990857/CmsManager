
using CmsManager.Common;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace SixCom.SCM.AjaxRequest
{
    /// <summary>
    /// ValidCode 的摘要说明
    /// </summary>
    public class ValidCode : IHttpHandler, IRequiresSessionState, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "image/gif";
            Bitmap basemap = new Bitmap(200, 60);
            Graphics garph1 = Graphics.FromImage(basemap);

            garph1.FillRectangle(new SolidBrush(Color.White), 0, 0, 200, 60);
            Font font = new Font(FontFamily.GenericSerif, 48, FontStyle.Bold, GraphicsUnit.Pixel);

            System.Random r = new System.Random();
            string letters = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
            string letter;
            StringBuilder s = new StringBuilder();
            for (int i = 0; i < 5; i++)
            {
                letter = letters.Substring(r.Next(0, letters.Length - 1), 1);
                s.Append(letter);
                garph1.DrawString(letter, font, new SolidBrush(Color.Black), i * 38, r.Next(0, 15));

            }

            Pen linePen = new Pen(new SolidBrush(Color.Black), 2);
            for (int x = 0; x < 6; x++)
            {
                garph1.DrawLine(linePen, new Point(r.Next(0, 199), r.Next(0, 59)), new Point(r.Next(0, 199), r.Next(0, 59)));
            }

            basemap.Save(context.Response.OutputStream, ImageFormat.Gif);
            // context.Session["CheckCode"] = s.ToString();    //存入Session，用于对比验证
            Cookie.WriteCookie("CheckCode", s.ToString(), DateTime.Now.AddMinutes(2));
            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}