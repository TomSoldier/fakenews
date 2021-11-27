using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Dal.Entites
{
    public class ArticleCategory
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int CategoryId { get; set; }
        public virtual Article Article { get; }
        public virtual Category Category { get;}
    }
}
