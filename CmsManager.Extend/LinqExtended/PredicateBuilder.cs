
namespace CmsManager.Extend.LinqExtended

{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Collections.Generic;

    /// <summary>
    /// 谓词生成器
    /// 用于where多条件表达式组合
    /// 例如：var predicate = PredicateBuilder.True<Course>(); 
    /// predicate=predicate.And(a=>a.Id==id);并且关系
    /// predicate=predicate.Or(a=>a.Name==name);或者关系
    /// predicate=predicate.And(a=>a.Pwd==pwd);条件重复拼接
    /// </summary>
    public static class PredicateBuilder
    {

        /// <summary>
        /// 用法：var predicate = PredicateBuilder.True<Course>();  Course是类名
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static Expression<Func<T, bool>> True<T>() { return f => true; }
        /// <summary>
        /// 用法：var predicate = PredicateBuilder.False<Course>();  Course是类名
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static Expression<Func<T, bool>> False<T>() { return f => false; }

        /// <summary>
        /// 组成
        /// </summary>
        /// <typeparam name="T">类</typeparam>
        /// <param name="first">第一个表达式</param>
        /// <param name="second">第二个表达式</param>
        /// <param name="merge">合并</param>
        /// <returns></returns>
        public static Expression<T> Compose<T>(this Expression<T> first, Expression<T> second, Func<Expression, Expression, Expression> merge)
        {
            // build parameter map (from parameters of second to parameters of first)
            //构建参数图（从参数的第一个参数）
            var map = first.Parameters.Select((f, i) => new { f, s = second.Parameters[i] }).ToDictionary(p => p.s, p => p.f);

            // replace parameters in the second lambda expression with parameters from the first
            //代替从第一个参数的二lambda表达式参数
            var secondBody = ParameterRebinder.ReplaceParameters(map, second.Body);

            // apply composition of lambda expression bodies to parameters from the first expression 
            //应用表达λ从第一个表达式参数体组成
            return Expression.Lambda<T>(merge(first.Body, secondBody), first.Parameters);
        }

        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> first, Expression<Func<T, bool>> second)
        {
            return first.Compose(second, Expression.And);
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> first, Expression<Func<T, bool>> second)
        {
            return first.Compose(second, Expression.Or);
        }
    }

    public class ParameterRebinder : ExpressionVisitor
    {
        private readonly Dictionary<ParameterExpression, ParameterExpression> map;

        public ParameterRebinder(Dictionary<ParameterExpression, ParameterExpression> map)
        {
            this.map = map ?? new Dictionary<ParameterExpression, ParameterExpression>();
        }

        public static Expression ReplaceParameters(Dictionary<ParameterExpression, ParameterExpression> map, Expression exp)
        {
            return new ParameterRebinder(map).Visit(exp);
        }

        protected override Expression VisitParameter(ParameterExpression p)
        {
            ParameterExpression replacement;
            if (map.TryGetValue(p, out replacement))
            {
                p = replacement;
            }
            return base.VisitParameter(p);
        }
    }
}
