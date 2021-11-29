using FakeNews.Transfer.Jwt;
using FakeNews.Transfer.Users;
using System.Threading.Tasks;

namespace FakeNews.Bll.Users
{
    public interface IUserService
    {
        Task<TokenDto> LogUserInAsync(LoginDto loginDto);
        Task RegisterUserAsync(RegisterUserDto registerUserDto);
    }
}
