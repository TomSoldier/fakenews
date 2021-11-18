﻿using System;
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
            Articles = new List<Article>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Article> Articles { get;}
    }
}
