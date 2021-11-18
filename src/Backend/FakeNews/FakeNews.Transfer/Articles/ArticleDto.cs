using FakeNews.Transfer.Categories;
using System;

namespace FakeNews.Transfer.Articles
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CreatedByUserId { get; set; }
        public string Content { get; set; }
        public int? CategoryId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedByUserUserName { get; set; }
        public virtual CategoryDto CategoryName { get; set; }
    }
}
