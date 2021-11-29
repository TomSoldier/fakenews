using System.ComponentModel.DataAnnotations;

namespace FakeNews.Transfer.Users
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
