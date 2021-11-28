using FakeNews.Bll.Articles;
using FakeNews.Common.Roles;
using FakeNews.Transfer.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FakeNews.Api.Controllers
{
    [Route("api/Comments")]
    [ApiController]
    public class CommentController
    {
        private readonly IArticleService articleService;

        public CommentController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpPost]
        [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.User}")]
        public async Task AddComment(PostCommentDto dto)
        {
            await articleService.PostCommentToArticle(dto);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<CommentDto>> GetComments(int id)
        {
            return await articleService.GetCommentsByArticleId(id);
        }
    }
}
