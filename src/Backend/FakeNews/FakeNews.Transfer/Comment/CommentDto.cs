using System;

namespace FakeNews.Transfer.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public int ArticleId { get; set; }
        public string ByUsername { get; set; }
    }
}
