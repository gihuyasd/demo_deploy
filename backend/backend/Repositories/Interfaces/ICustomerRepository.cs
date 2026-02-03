using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer?> GetByUsername(string username);
        Task AddAsync(Customer customer);
    }
}
