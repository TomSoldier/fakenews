using FakeNews.Common.Roles;
using FakeNews.Dal.Context;
using FakeNews.Dal.Entites;
using FakeNews.Transfer.Jwt;
using FakeNews.Transfer.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Users
{
    public class UserService : IUserService
    {
        private readonly FakeNewsDbContext dbContext;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;

        public UserService(
            FakeNewsDbContext dbContext,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        public async Task<TokenDto> LogUserInAsync(LoginDto loginDto)
        {
            User user;
            try
            {
                user = await dbContext.Users.SingleAsync(u => u.Email == loginDto.Email);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("The email or password is invalid");
            }

            if (!await userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                throw new ArgumentException("The email or password is invalid");
            }

            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
                {
                    new Claim(Common.Roles.ClaimTypes.Name, user.UserName),
                    new Claim(Common.Roles.ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(Common.Roles.ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

            return new TokenDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            };
        }

        public async Task RegisterUserAsync(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                UserName = registerUserDto.Username,
                Email = registerUserDto.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await userManager.CreateAsync(user, registerUserDto.Password);

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            else
            {
                throw new ArgumentException("The user already exists or the entered data is invalid. Password must be at least 6 characters long, and contain at both letters, numbers and 1 special (non alphanumeric) character");
            }
        }
    }
}
