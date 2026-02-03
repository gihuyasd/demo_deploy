using backend.Models.DTOs;

namespace backend.Services.Interfaces
{
    public interface ICartService
    {
        Task<int> GetCartItemCount(int customerId);
        Task<bool> IncreaseItem(int customerId, int foodId);
        Task<bool> DecreaseItem(int customerId, int foodId);
        Task<bool> RemoveItem(int customerId, int foodId);
        Task<List<CartItemResponseDto>> GetCart(int customerId);

    }
}
