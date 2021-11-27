using AutoMapper;
using AutoMapper.QueryableExtensions;
using FakeNews.Bll.Extensions;
using FakeNews.Dal.Context;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Articles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FakeNews.Bll.Articles
{
    public class ArticleService : IArticleService
    {
        private readonly FakeNewsDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<User> userManager;

        public ArticleService(
            FakeNewsDbContext dbContext,
            IMapper mapper,
            IHttpContextAccessor httpContextAccessor,
            UserManager<User> userManager)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }

        public async Task<List<ArticleDto>> GetArticles(ArticleFilterDto filter)
        {
            return await dbContext.Articles
                .Where(filter.CategoryId.HasValue, a => a.CategoryId == filter.CategoryId)
                .Where(filter.FromDate.HasValue, a => a.CreatedDate >= filter.FromDate)
                .Where(filter.ToDate.HasValue, a => a.CreatedDate <= filter.ToDate)
                .ProjectTo<ArticleDto>(mapper)
                .ToListAsync();
        }

        public async Task<ArticleDto> GetArticleById(int id)
        {
            return await dbContext.Articles
                .Where(a => a.Id == id)
                .ProjectTo<ArticleDto>(mapper)
                .SingleAsync();
        }

        public async Task AddOrEditArticle(ArticleDto articleDto)
        {
            var article = await dbContext.Articles.FindAsync(articleDto.Id);

            if (article != null)
            {
                var user = await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name);
                if (article.CreatedByUserId != user.Id)
                {
                    throw new UnauthorizedAccessException("Only the creator can edit the article");
                }

                article.CategoryId = articleDto.CategoryId;
                article.Title = articleDto.Title;
                article.Content = article.Content;

            }
            else
            {
                dbContext.Articles.Add(new Article
                {
                    Title = articleDto.Title,
                    Content = articleDto.Content,
                    CategoryId = articleDto.CategoryId,
                    CreatedDate = DateTime.Now,
                    CreatedByUserId = (await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name)).Id,
                });
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteArticle(int id)
        {
            var articleToDelete = await dbContext.Articles.Where(a => a.Id == id).SingleOrDefaultAsync();
            if (articleToDelete != null)
            {
                var user = await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name);
                if (articleToDelete.CreatedByUserId != user.Id)
                {
                    throw new UnauthorizedAccessException("Only the creator can delete the article");
                }
            }
            dbContext.Articles.Remove(articleToDelete);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<ArticleDto>> GetHomepageArticles()
        {
            return await dbContext.Articles
                .Where(a => a.ShownOnHomepage)
                .ProjectTo<ArticleDto>(mapper)
                .ToListAsync();
        }

        public async Task InvertShownOnHomepage(int id)
        {
            var article = await dbContext.Articles.FindAsync(id);

            if(article == null)
            {
                throw new ArgumentException("The article with this ID doesn't exist");
            }

            article.ShownOnHomepage = !article.ShownOnHomepage;
            await dbContext.SaveChangesAsync();
        }
    }
}
