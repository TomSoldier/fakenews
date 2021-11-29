using AutoMapper;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Articles;
using FakeNews.Transfer.Categories;
using FakeNews.Transfer.Comment;
using System.Linq;

namespace FakeNews.Bll.Mappings
{
    public static class MapperConfig
    {
        public static IMapper ConfigureAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Category, CategoryDto>();
                cfg.CreateMap<Article, ArticleDto>()
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.ArticleCategories.Select(ac => ac.Category)));

                cfg.CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.ByUsername, opt => opt.MapFrom(src => src.User.UserName));
            });

            config.AssertConfigurationIsValid();

            return config.CreateMapper();
        }
    }
}
