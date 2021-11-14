using FakeNews.Dal.Context;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Users
{
    public class UserService : IUserService
    {
        private readonly SignInManager<User> signInManager;
        private readonly FakeNewsDbContext dbContext;
        private readonly UserManager<User> userManager;

        public UserService(SignInManager<User> signInManager, FakeNewsDbContext dbContext, UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        public async Task LogUserInAsync(LoginDto loginDto)
        {
            var user = await dbContext.Users.SingleAsync(u => u.Email == loginDto.Email);
            await signInManager.PasswordSignInAsync(user, loginDto.Password, loginDto.Remember, false);
        }

        public async Task RegisterUserAsync(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                UserName = registerUserDto.Username,
                Email = registerUserDto.Email
            };

            await userManager.CreateAsync(user, registerUserDto.Password);
        }
    }
}
