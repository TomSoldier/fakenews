using System.Collections.Generic;

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
        public string ColorCode { get; set; }
        public virtual ICollection<ArticleCategory> ArticleCategories { get;}
    }
}
