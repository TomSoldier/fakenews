using FakeNews.Transfer.Categories;
using System.Collections.Generic;
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
