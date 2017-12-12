using SixCom.Core.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq.Expressions;
using SixCom.Core;
using System.Data.Entity;
using CmsManager.Data;
using System.Runtime.Remoting.Messaging;

namespace CmsManager.BLL
{
    /// <summary>
    /// 业务父类，公共方法统一调用
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public class BaseBLL<TEntity> : IBusinessLayer<TEntity> where TEntity : class
    {
       public DbContext context;
       public DbSet<TEntity> dbSet;
        public BaseBLL()
        {
            context = DefaultDbContextFactory.GetCurrentDbContext();
            dbSet=context.Set<TEntity>();
        }

        public BaseBLL(DbContext db)
        {
            context = db;
            dbSet = context.Set<TEntity>();
        }

        /// <summary>
        /// 根据条件返回条数
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public int Count(Expression<Func<TEntity, bool>> predicate)
        {
           return dbSet.Count(predicate);
        }
        /// <summary>
        /// 根据对象删除
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int Delete(TEntity entity)
        {
            if (context.Entry(entity).State ==EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
            return SaveChanges();
        }
        /// <summary>
        /// 根据Id进行删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int Delete(int id)
        {
          var entity=dbSet.Find(id);
            return Delete(entity);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        public void DeleteNotSubmit(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteNotSubmit(int id)
        {
            throw new NotImplementedException();
        }

        public void Deletes(int[] str)
        {
            throw new NotImplementedException();
        }

        public int ExecuteSql(string sql, params SqlParameter[] parameters)
        {
            throw new NotImplementedException();
        }

        public virtual List<TEntity> GetALL()
        {
            return dbSet.ToList();
        }

        public List<TEntity> GetALL(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Where(predicate).ToList();
        }

        public List<TEntity> GetALL(string sql, params SqlParameter[] parameters)
        {
            throw new NotImplementedException();
        }

        public List<TEntity> GetALL(int pageNo, int pageSize, out int total, System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate, string order, string lift = "desc")
        {
            throw new NotImplementedException();
        }

        public TEntity GetById(int id)
        {
          var entity=dbSet.Find(id);
            return entity;
        }

        public TEntity GetEntity(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public DataTable GetTable(string sql, params SqlParameter[] parameters)
        {
            throw new NotImplementedException();
        }

        public int Insert(List<TEntity> entity)
        {
            foreach (var item in entity)
            {
                InsertNotSubmit(item);
            }
            return SaveChanges();
        }

        public int Insert(TEntity entity)
        {
            dbSet.Add(entity);
            return SaveChanges();
        }

        public void InsertNotSubmit(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public TEntity InsertToEntity(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public int SaveChanges()
        {
            return context.SaveChanges();
        }

        public int Update(List<TEntity> entity)
        {
            throw new NotImplementedException();
        }

        public int Update(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public int Update(List<TEntity> entity, params string[] proNames)
        {
            throw new NotImplementedException();
        }

        public int Update(TEntity entity, params string[] proNames)
        {
            throw new NotImplementedException();
        }

        public void UpdateNotSubmit(TEntity entity)
        {
            throw new NotImplementedException();
        }

        
    }
}
