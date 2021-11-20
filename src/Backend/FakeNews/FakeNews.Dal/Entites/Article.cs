using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Dal.Entites
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CreatedByUserId { get; set; }
        public int? CategoryId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual User CreatedByUser { get; set; }
        public virtual Category Category { get; set; }
    }
}
