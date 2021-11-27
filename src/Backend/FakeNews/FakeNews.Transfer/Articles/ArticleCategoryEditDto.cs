using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Transfer.Articles
{
    public class ArticleCategoryEditDto
    {
        public int ArticleId { get; set; }
        public List<int > CategoryIds { get; set; }
    }
}
