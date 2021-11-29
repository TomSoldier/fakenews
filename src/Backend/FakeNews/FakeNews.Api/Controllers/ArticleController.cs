using FakeNews.Bll.Articles;
using FakeNews.Common.Roles;
using FakeNews.Transfer.Articles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        [Route("searchArticles")]
        public Task<List<ArticleDto>> GetArticles(ArticleFilterDto filter)
        {
            return articleService.GetArticles(filter);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            try
            {
                return Ok(await articleService.GetArticleById(id));
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> AddOrEditArticle(ArticleDto articleDto)
        {
            try
            {
                await articleService.AddOrEditArticle(articleDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteMeasurement(int id)
        {
            try
            {
                await articleService.DeleteArticle(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost]
        [Route("EditCategories")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> EditArticleCategories(ArticleCategoryEditDto dto)
        {
            try
            {
                await articleService.EditArticleCategories(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException)
                    return NotFound(ex.Message);
                else if (ex is UnauthorizedAccessException)
                    return Unauthorized(ex.Message);
                else
                    throw;
            }
        }
    }
}
