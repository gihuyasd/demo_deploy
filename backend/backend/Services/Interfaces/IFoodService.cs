using backend.Models.Entities;

namespace backend.Services.Interfaces
{
    public interface IFoodService
    {
        Task<List<Food>> GetAllAsync();
    }
}
