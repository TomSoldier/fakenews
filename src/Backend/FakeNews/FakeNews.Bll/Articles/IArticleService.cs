using FakeNews.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Articles
{
    public interface IArticleService
    {
        Task<List<ArticleDto>> GetArticles();
    }
}
