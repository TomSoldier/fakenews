using System;

namespace FakeNews.Transfer.Jwt
{
    public class TokenDto
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
