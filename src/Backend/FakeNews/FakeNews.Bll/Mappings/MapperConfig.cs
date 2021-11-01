using AutoMapper;
using FakeNews.Dal.Entites;
using FakeNews.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Mappings
{
    public static class MapperConfig
    {
        public static IMapper ConfigureAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Article, ArticleDto>();
            });

            config.AssertConfigurationIsValid();

            return config.CreateMapper();
        }
    }
}
