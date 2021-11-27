using FakeNews.Bll.Articles;
using FakeNews.Common.Roles;
using FakeNews.Transfer.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public Task AddComment(PostCommentDto dto)
        {
            return articleService.PostCommentToArticle(dto);
        }
    }
}
