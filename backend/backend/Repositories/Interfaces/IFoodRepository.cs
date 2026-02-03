using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface IFoodRepository
    {
        Task<List<Food>> GetAllAsync();
        Task<Food?> GetFoodById(int id);
    }
}
