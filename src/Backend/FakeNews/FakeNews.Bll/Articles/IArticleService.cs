using FakeNews.Transfer.Articles;
using FakeNews.Transfer.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Articles
{
    public interface IArticleService
    {
        Task<List<ArticleDto>> GetArticles(ArticleFilterDto filter);
        Task<ArticleDto> GetArticleById(int id);
        Task AddOrEditArticle(ArticleDto articleDto);
        Task DeleteArticle(int id);
        Task<List<ArticleDto>> GetHomepageArticles();
        Task EditArticleCategories(ArticleCategoryEditDto dto);
        Task InvertShownOnHomepage(int id);

        Task PostCommentToArticle(PostCommentDto dto);
    }
}
