using FakeNews.Bll.Articles;
using FakeNews.Common.Roles;
using FakeNews.Transfer.Articles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FakeNews.Api.Controllers
{
    [Route("api/HomePage")]
    [ApiController]
    public class HomepageController
    {
        private readonly IArticleService articleService;

        public HomepageController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpGet]
        public Task<List<ArticleDto>> GetHomePageArticles()
        {
            return articleService.GetHomepageArticles();
        }

        [HttpPost]
        [Route("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public Task SetShownOnHomepage(int id)
        {
            return articleService.InvertShownOnHomepage(id);
        }
    }
}
