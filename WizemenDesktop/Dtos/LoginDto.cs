using Wizemen.NET.Models;

namespace WizemenDesktop.Dtos
{
    public class LoginDto
    {
        public Credentials Credentials { get; set; }
        public bool RememberMe { get; set; }
    }
}