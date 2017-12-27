using SixCom.Core.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Data.Entity;
using System.Linq.Expressions;
using CmsManager.Extend.LinqExtended;
using CmsManager.Data;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;

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
            return context.Database.SqlQuery<TEntity>(sql, parameters).ToList();
        }

        /// <summary>
        /// 按条件查询列表--分页
        /// </summary>
        /// <param name="pageNo">当前页</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="total">总记录数</param>
        /// <param name="predicate">条件表达式</param>
        /// <param name="order">排序字段</param>
        /// <param name="lift">升降序 desc：降序（默认）ace：升序</param>
        /// <returns></returns>
        public virtual List<TEntity> GetALL(int pageNo, int pageSize, out int total, Expression<Func<TEntity, bool>> predicate, string order, string lift = "Desc")
        {
            //  if (pageNo == 0) pageNo = 1;
            var result = dbSet.Where(predicate);
            total = result.Count();
            result = lift == "Desc" ? result.OrderByDescending(order) : result.OrderBy(order);
            // var r = result.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            var r = result.Skip(pageNo).Take(pageSize).ToList();
            return r;
        }


        public TEntity GetById(int id)
        {
          var entity=dbSet.Find(id);
            return entity;
        }

        public TEntity GetEntity(Expression<Func<TEntity, bool>> predicate)
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
            dbSet.Add(entity);
            SaveChanges();
            return entity;
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
            Exists(entity);
            dbSet.Attach(entity);
            context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            return SaveChanges();
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

        /// <summary>
        /// 如果上下文中存在对象则移除
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool Exists(TEntity entity)
        {
            ObjectContext _ObjContext = ((IObjectContextAdapter)context).ObjectContext;
            ObjectSet<TEntity> _ObjSet = _ObjContext.CreateObjectSet<TEntity>();
            var entityKey = _ObjContext.CreateEntityKey(_ObjSet.EntitySet.Name, entity);
            Object foundEntity;
            var exists = _ObjContext.TryGetObjectByKey(entityKey, out foundEntity);
            if (exists)
            {
                _ObjContext.Detach(foundEntity);
            }
            return (exists);
        }
    }
}
