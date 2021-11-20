using FakeNews.Bll.Categories;
using FakeNews.Common.Roles;
using FakeNews.Transfer.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FakeNews.Api.Controllers
{
    [Route("api/Categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        public Task<List<CategoryDto>> ListCategories()
        {
            return categoryService.ListCategories();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                return Ok(await categoryService.GetCategoryById(id));
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public Task AddOrEditCategory(CategoryDto dto)
        {
            return categoryService.AddOrEditCategory(dto);
        }

        [HttpDelete]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("{id}")]
        public Task DeleteCategory(int id)
        {
            return categoryService.DeleteCategory(id);
        }
    }
}
