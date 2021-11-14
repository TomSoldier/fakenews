using AutoMapper;
using AutoMapper.QueryableExtensions;
using FakeNews.Dal.Context;
using FakeNews.Transfer.Articles;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FakeNews.Bll.Articles
{
    public class ArticleService: IArticleService
    {
        private readonly FakeNewsDbContext dbContext;
        private readonly IMapper mapper;

        public ArticleService(FakeNewsDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<List<ArticleDto>> GetArticles()
        {
            return await dbContext.Articles
                .ProjectTo<ArticleDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
