using FakeNews.Transfer.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Categories
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> ListCategories();
        Task<CategoryDto> GetCategoryById(int id);
        Task AddOrEditCategory(CategoryDto dto);
        Task DeleteCategory(int id);
    }
}
