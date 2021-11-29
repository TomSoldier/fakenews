using System;

namespace FakeNews.Dal.Entites
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public int ArticleId { get; set; }
        public virtual User User { get; set; }
        public virtual Article Article { get; set; }
    }
}
