using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.Models.Entities;

namespace backend.Services.Implementations
{
    public class FoodService: IFoodService
    {
        private readonly IFoodRepository _repo;
        public FoodService(IFoodRepository repo) {
            _repo = repo; 
        }
        public async Task<List<Food>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

    }
}
