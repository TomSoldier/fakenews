using FakeNews.Transfer.Categories;
using FakeNews.Transfer.Comment;
using System;
using System.Collections.Generic;

namespace FakeNews.Transfer.Articles
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CreatedByUserId { get; set; }
        public string Content { get; set; }
        public bool ShownOnHomepage { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedByUserUserName { get; set; }
        public List<CategoryDto> Categories { get; set; }
        public List<CommentDto> Comments { get; set; }
    }
}
