﻿using System;

namespace FakeNews.Transfer.Articles
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CreatedByUserId { get; set; }
        public string Content { get; set; }
    }
}