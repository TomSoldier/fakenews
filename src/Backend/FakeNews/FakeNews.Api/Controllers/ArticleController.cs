using FakeNews.Bll.Articles;
using FakeNews.Bll.Roles;
using FakeNews.Transfer.Articles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FakeNews.Api.Controllers
{
    [Route("api/Articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticlesController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpPost]
        [Route("api/Articles/searchArticles")]
        public Task<List<ArticleDto>> GetArticles(ArticleFilterDto filter)
        {
            return articleService.GetArticles(filter);
        }

        [HttpGet]
        [Route("api/Articles/:id")]
        public Task<ArticleDto> GetArticleById(int id)
        {
            return articleService.GetArticleById(id);
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public Task AddOrEditArticle(ArticleDto articleDto)
        {
            return articleService.AddOrEditArticle(articleDto);
        }

        [Route("api/Articles/:id")]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        [Authorize]
        public Task DeleteMeasurement(int id)
        {
            return articleService.DeleteArticle(id);
        }
    }
}
