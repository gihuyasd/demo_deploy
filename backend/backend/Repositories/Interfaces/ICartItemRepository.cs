using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface ICartItemRepository
    {
        Task<CartItem?> GetItem(int cartId, int foodId);
        Task AddAsync(CartItem item);
        void Remove(CartItem item);
        Task Save();
        Task<List<CartItem>> GetItemsByCartId(int cartId);
    }
}
