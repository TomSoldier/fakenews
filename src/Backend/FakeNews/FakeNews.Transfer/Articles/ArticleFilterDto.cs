using System;

namespace FakeNews.Transfer.Articles
{
    public class ArticleFilterDto
    {
        public int? CategoryId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
