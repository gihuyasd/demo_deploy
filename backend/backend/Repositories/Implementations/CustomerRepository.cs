using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly AppDbContext _db;
        public CustomerRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Customer?> GetByUsername(string username)
        {
            return await _db.Customers.FirstOrDefaultAsync(c => c.Username == username);
        }

        public async Task AddAsync(Customer customer)
        {
            await _db.Customers.AddAsync(customer);
            await _db.SaveChangesAsync();
            var cart = new Cart
            {
                CustomerID = customer.Id
            };

            await _db.Carts.AddAsync(cart);
            await _db.SaveChangesAsync();
        }
    }
}
