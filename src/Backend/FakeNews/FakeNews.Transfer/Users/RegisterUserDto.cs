using System.ComponentModel.DataAnnotations;

namespace FakeNews.Transfer.Users
{
    public class RegisterUserDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
