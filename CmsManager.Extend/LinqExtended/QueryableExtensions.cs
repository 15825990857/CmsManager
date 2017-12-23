
namespace CmsManager.Extend.LinqExtended
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    /// <summary>
    /// Entity Framework排序扩展
    /// 支持升序、降序、多字段排序
    /// </summary>
    public static class QueryableExtensions
    {
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, String propertyName)
        {
            return InternalOrder<T>(source, propertyName, "OrderBy");
        }

        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, String propertyName)
        {
            return InternalOrder<T>(source, propertyName, "OrderByDescending");
        }

        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, String propertyName)
        {
            return InternalOrder<T>(source, propertyName, "ThenBy");
        }
        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, String propertyName)
        {
            return InternalOrder<T>(source, propertyName, "ThenByDescending");
        }

        private static IOrderedQueryable<T> InternalOrder<T>(IQueryable<T> source, String propertyName, String methodName)
        {
            Type type = typeof(T);
            ParameterExpression arg = Expression.Parameter(type, "p");
            PropertyInfo property = type.GetProperty(propertyName);
            Expression expr = Expression.Property(arg, property);
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), property.PropertyType);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

            return ((IOrderedQueryable<T>)(typeof(Queryable).GetMethods().Single(
                p => String.Equals(p.Name, methodName, StringComparison.Ordinal)
                    && p.IsGenericMethodDefinition
                    && p.GetGenericArguments().Length == 2
                    && p.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(T), property.PropertyType)
                .Invoke(null, new Object[] { source, lambda })));
        }
    }
}
