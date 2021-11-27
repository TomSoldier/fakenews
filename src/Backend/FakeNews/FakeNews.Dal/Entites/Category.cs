using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Dal.Entites
{
    public class Category
    {
        public Category()
        {
            ArticleCategories = new List<ArticleCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<ArticleCategory> ArticleCategories { get;}
    }
}
