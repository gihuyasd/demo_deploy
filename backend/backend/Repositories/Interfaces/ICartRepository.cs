using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<int> GetTotalItemByCustomerId(int customerId);
        Task<Cart?> GetCartByCustomerId(int customerId);
        Task ClearCart(int customerId);
    }
}
