using FakeNews.Bll.Users;
using FakeNews.Transfer.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FakeNews.Api.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("api/Users/login")]
        public Task Login([FromBody] LoginDto loginDto)
        {
            return userService.LogUserInAsync(loginDto);
        }

        [HttpPost]
        [Route("api/Users/register")]
        public Task Register([FromBody] RegisterUserDto registerUserDto)
        {
            return userService.RegisterUserAsync(registerUserDto);
        }
    }
}
