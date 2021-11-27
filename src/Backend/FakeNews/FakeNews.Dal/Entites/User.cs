using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Dal.Entites
{
    public class User : IdentityUser
    {
        public User()
        {
            Articles = new List<Article>();
        }

        public virtual ICollection<Article> Articles { get; }
        public virtual ICollection<Comment> Comments { get; }
    }
}
