using FakeNews.Transfer.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Bll.Users
{
    public interface IUserService
    {
        Task LogUserInAsync(LoginDto loginDto);
        Task RegisterUserAsync(RegisterUserDto registerUserDto);
    }
}
