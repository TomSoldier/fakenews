using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ProjectTo<T>(this IQueryable source, IMapper mapper) => source.ProjectTo<T>(mapper.ConfigurationProvider);
        public static IQueryable<T> Where<T>(this IQueryable<T> queryable, bool condition, Expression<Func<T, bool>> predicate) =>
           condition ? queryable.Where(predicate) : queryable;
    }
}
