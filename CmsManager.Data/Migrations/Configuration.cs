namespace CmsManager.Data.Migrations
{
    using Common;
    using Core.Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CmsManager.Data.DbBaseContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(CmsManager.Data.DbBaseContext context)
        {
             //初管理员账户始化值
            context.Set<User>().AddOrUpdate(
                p=>p.UserName,
                new User
                {
                    UserName = "admin",
                    CreateTime = DateTime.Now,
                    Pwd = Encrypt.EncryptMD5By32("123456"),
                    Status = 2
                }
             );

            //初始化基础菜单
            context.Set<Menu>().AddOrUpdate(
                p => p.Text,
                new Menu
                {
                    type = 1,
                    Status = 2,
                    Index = 1,
                    Parent = 0,
                    Text = "基础数据",
                    CreateTime = DateTime.Now
                },
                new Menu {
                    type = 1,
                    Status = 2,
                    Index = 2,
                    Parent = 0,
                    Text = "系统设置",
                    CreateTime = DateTime.Now
                },
                    new Menu
                    {
                        type = 1,
                        Status = 2,
                        Index = 2,
                        Parent = 0,
                        Text = "菜单管理",
                        CreateTime = DateTime.Now
                    }
                );
            //按钮
            context.Set<Button>().AddOrUpdate(
                p => p.Text,
                new Button
                {
                    Text = "新增"
                },
                new Button {
                    Text="修改"
                },new Button {
                    Text="删除"
                }
                );
        }
    }
}
