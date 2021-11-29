using System;
using System.Collections.Generic;

namespace FakeNews.Dal.Entites
{
    public class Article
    {
        public Article()
        {
            ArticleCategories = new List<ArticleCategory>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string CreatedByUserId { get; set; }
        public string Content { get; set; }
        public bool ShownOnHomepage { get; set; }
        public DateTime? ValidTo { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual User CreatedByUser { get; set; }
        public virtual ICollection<ArticleCategory> ArticleCategories { get;}
        public virtual ICollection<Comment> Comments { get;}
    }
}
