using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class CartItemRepository: ICartItemRepository
    {
        private readonly AppDbContext _db;

        public CartItemRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<CartItem?> GetItem(int cartId, int foodId){
            return await _db.CartItems.FirstOrDefaultAsync
                (x => x.CartId == cartId && x.FoodId == foodId);
        }

        public async Task AddAsync(CartItem item)
        {
            await _db.CartItems.AddAsync(item);
        }
        public void Remove(CartItem item)
        {
            _db.CartItems.Remove(item);
        }

        public async Task Save()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<List<CartItem>> GetItemsByCartId(int cartId)
        {
            return await _db.CartItems
                .Include(x => x.Food)
                .Where(x => x.CartId == cartId)
                .ToListAsync();
        }
    }
}
