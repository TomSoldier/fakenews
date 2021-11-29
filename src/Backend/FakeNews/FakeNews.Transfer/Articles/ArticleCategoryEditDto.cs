using System.Collections.Generic;

namespace FakeNews.Transfer.Articles
{
    public class ArticleCategoryEditDto
    {
        public int ArticleId { get; set; }
        public List<int > CategoryIds { get; set; }
    }
}
