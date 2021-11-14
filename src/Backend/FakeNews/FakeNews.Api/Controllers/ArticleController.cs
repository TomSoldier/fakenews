using FakeNews.Bll.Articles;
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

        [HttpGet]
        public Task<List<ArticleDto>> GetArticles()
        {
            return articleService.GetArticles();
        }
    }
}
