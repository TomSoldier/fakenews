using AutoMapper;
using AutoMapper.QueryableExtensions;
using FakeNews.Bll.Extensions;
using FakeNews.Dal.Context;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Articles;
using FakeNews.Transfer.Comment;
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
                .Include(a => a.ArticleCategories)
                .ThenInclude(ac => ac.Category)
                .Where(a => !a.ValidTo.HasValue || a.ValidTo <= DateTime.Now)
                .Where(filter.CategoryId.HasValue, a => a.ArticleCategories.Any(ac => ac.CategoryId == filter.CategoryId))
                .Where(filter.FromDate.HasValue, a => a.CreatedDate >= filter.FromDate)
                .Where(filter.ToDate.HasValue, a => a.CreatedDate <= filter.ToDate)
                .ProjectTo<ArticleDto>(mapper)
                .ToListAsync();
        }

        public async Task<ArticleDto> GetArticleById(int id)
        {
            return await dbContext.Articles
                .Where(a => a.Id == id)
                .Include(a => a.ArticleCategories)
                .ThenInclude(ac => ac.Category)
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

                article.Title = articleDto.Title;
                article.Content = article.Content;
                article.ArticleCategories.Clear();
                articleDto.Categories.ForEach(x => article.ArticleCategories.Add(new ArticleCategory { ArticleId = article.Id, CategoryId = x.Id }));
                article.ShownOnHomepage = articleDto.ShownOnHomepage;
                article.ValidTo = articleDto.ValidTo;

            }
            else
            {
                var newArticle = new Article
                {
                    Id = 0,
                    Title = articleDto.Title,
                    Content = articleDto.Content,
                    CreatedDate = DateTime.Now,
                    CreatedByUserId = (await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name)).Id,
                    ShownOnHomepage = article.ShownOnHomepage,
                    ValidTo = articleDto.ValidTo,
                };

                articleDto.Categories.ForEach(x => newArticle.ArticleCategories.Add(new ArticleCategory { ArticleId = newArticle.Id, CategoryId = x.Id }));

                dbContext.Articles.Add(newArticle);
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

            if (article == null)
            {
                throw new ArgumentException("The article with this ID doesn't exist");
            }

            article.ShownOnHomepage = !article.ShownOnHomepage;
            await dbContext.SaveChangesAsync();
        }

        public async Task EditArticleCategories(ArticleCategoryEditDto dto)
        {
            var article = await dbContext.Articles
                .Where(a => a.Id == dto.ArticleId)
                .Include(a => a.ArticleCategories)
                .SingleOrDefaultAsync();

            if (article == null)
            {
                throw new ArgumentException("The article with this ID doesn't exist");
            }

            var user = await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name);
            if (article.CreatedByUserId != user.Id)
            {
                throw new UnauthorizedAccessException("Only the creator can edit the article");
            }

            dbContext.ArticleCategories.RemoveRange(article.ArticleCategories);

            foreach (var categoryId in dto.CategoryIds)
            {
                dbContext.ArticleCategories.Add(new ArticleCategory
                {
                    ArticleId = article.Id,
                    CategoryId = categoryId
                });
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task PostCommentToArticle(PostCommentDto dto)
        {
            var article = await dbContext.Articles.FindAsync(dto.ArticleId);

            if (article == null)
            {
                throw new ArgumentException("The article with this ID doesn't exist");
            }

            dbContext.Comments.Add(new Comment
            {
                ArticleId = article.Id,
                Content = dto.Content,
                CreatedAt = DateTime.Now,
                UserId = (await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Identity.Name)).Id
                
            });

            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByArticleId(int articleId)
        {
            var article = await dbContext.Articles.FindAsync(articleId);
            if (article == null)
            {
                throw new ArgumentException("The article with this ID doesn't exist");
            }

            return await dbContext.Comments
                .Where(x => x.ArticleId == articleId)
                .ProjectTo<CommentDto>(mapper)
                .ToListAsync() ;
        }
    }
}
