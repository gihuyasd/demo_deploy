using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql.PostgresTypes;

namespace backend.Repositories.Implementations
{
    public class CartRepository: ICartRepository
    {
        private readonly AppDbContext _db;

        public CartRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<int> GetTotalItemByCustomerId(int customerId)
        {
            return await _db.CartItems
                .Where(ci => ci.Cart.CustomerID == customerId)
                .CountAsync();
        }

        public async Task<Cart?> GetCartByCustomerId(int customerId)
        {
            return await _db.Carts.FirstOrDefaultAsync(x => x.CustomerID == customerId);
        }

        public async Task ClearCart(int customerId)
        {
            var cart = await _db.Carts.FirstOrDefaultAsync(c => c.CustomerID == customerId);
            if (cart != null)
            {
                await _db.CartItems
                    .Where(ci => ci.CartId == cart.Id)
                    .ExecuteDeleteAsync();
            }
        }
    }
}
