using backend.Helpers;
using backend.Models.DTOs;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using BCrypt.Net;

namespace backend.Services.Implementations
{
    public class AuthService: IAuthService
    {
        private readonly ICustomerRepository _repo;
        private readonly JwtHelper _jwt;

        public AuthService(ICustomerRepository repo, JwtHelper jwt)
        {
            _repo = repo;
            _jwt = jwt;
        }

        public async Task<string?> Login(string username, string password)
        {
            var user = await _repo.GetByUsername(username);
            if (user == null) { return null; }

            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }
            return _jwt.GenerateToken(user);
        }

        public async Task<bool> Register(RegisterDto dto)
        {
            var exist = await _repo.GetByUsername(dto.Username);
            if (exist != null) return false;

            var customer = new Customer
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
                Username = dto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _repo.AddAsync(customer);

            return true;
        }
    }
}
