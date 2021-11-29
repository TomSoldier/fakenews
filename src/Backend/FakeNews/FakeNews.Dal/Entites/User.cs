using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

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
