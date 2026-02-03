using backend.Models.DTOs;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class CartService: ICartService
    {
        private readonly ICartRepository _cartRepo;
        private readonly ICartItemRepository _cartItemRepo;
        private readonly IFoodRepository _foodRepository;

        public CartService(ICartRepository cartRepo, ICartItemRepository cartItemRepo, IFoodRepository foodRepository)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
            _foodRepository = foodRepository;
        }

        public async Task<int> GetCartItemCount(int customerId)
        {
            return await _cartRepo.GetTotalItemByCustomerId(customerId);
        }

        public async Task<bool> IncreaseItem(int customerId, int foodId)
        {
            var cart = await _cartRepo.GetCartByCustomerId(customerId);
            if (cart == null) return false;

            var item = await _cartItemRepo.GetItem(cart.Id, foodId);
            if (item == null)
            {
                var food = await _foodRepository.GetFoodById(foodId);
                var newItem = new CartItem
                {
                    CartId = cart.Id,
                    FoodId = foodId,
                    Food = food,
                    Quantity = 1
                };
                await _cartItemRepo.AddAsync(newItem);
            }
            else
            {
                item.Quantity += 1;
            }
            await _cartItemRepo.Save();
            return true;
        }
            
        public async Task<bool> DecreaseItem(int customerId, int foodId)
        {
            var cart = await _cartRepo.GetCartByCustomerId(customerId);
            if (cart == null) return false;

            var item = await _cartItemRepo.GetItem(cart.Id, foodId);
            if (item == null) return false;

            item.Quantity -= 1;

            if (item.Quantity <= 0)
                _cartItemRepo.Remove(item);

            await _cartItemRepo.Save();

            return true;
        }

        public async Task<bool> RemoveItem(int customerId, int foodId)
        {
            var cart = await _cartRepo.GetCartByCustomerId(customerId);
            if (cart == null) return false;

            var item = await _cartItemRepo.GetItem(cart.Id, foodId);
            if (item == null) return false;

            _cartItemRepo.Remove(item);
            await _cartItemRepo.Save();
            return true;
        }

        public async Task<List<CartItemResponseDto>> GetCart(int customerId)
        {
            var cart = await _cartRepo.GetCartByCustomerId(customerId);
            if (cart == null)
                return new List<CartItemResponseDto>();

            var items = await _cartItemRepo.GetItemsByCartId(cart.Id);

            return items.Select(i => new CartItemResponseDto
            {
                Id = i.FoodId,
                Name = i.Food.Name,
                Price = i.Food.Price,
                Image = i.Food.Image,
                Quantity = i.Quantity
            }).ToList();
        }

    }
}
