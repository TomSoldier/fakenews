using AutoMapper;
using AutoMapper.QueryableExtensions;
using FakeNews.Bll.Extensions;
using FakeNews.Dal.Context;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Categories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FakeNews.Bll.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly FakeNewsDbContext dbContext;
        private readonly IMapper mapper;

        public CategoryService(FakeNewsDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task AddOrEditCategory(CategoryDto dto)
        {
            var category = await dbContext.Categories.FindAsync(dto.Id);

            if (category != null)
            {
                category.Name = dto.Name;
                category.ColorCode = dto.ColorCode;
            }
            else
            {
                dbContext.Categories.Add(new Category
                {
                    Name = dto.Name,
                    ColorCode = dto.ColorCode
                });
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var categoryToDelete = await dbContext.Categories.FindAsync(id);
            dbContext.Remove(categoryToDelete);
            await dbContext.SaveChangesAsync();
        }

        public async Task<CategoryDto> GetCategoryById(int id)
        {
            return await dbContext.Categories
                .Where(c => c.Id == id)
                .ProjectTo<CategoryDto>(mapper)
                .SingleAsync();
        }

        public async Task<List<CategoryDto>> ListCategories()
        {
            return await dbContext.Categories
                .ProjectTo<CategoryDto>(mapper)
                .ToListAsync();
        }
    }
}
