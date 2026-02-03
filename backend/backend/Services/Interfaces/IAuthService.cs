using backend.Models.DTOs;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> Login(string username, string password);
        Task<bool> Register(RegisterDto dto);
    }
}
