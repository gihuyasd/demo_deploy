
using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class FoodRepository: IFoodRepository
    {
        private readonly AppDbContext _db;
        public FoodRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Food>> GetAllAsync()
        {
            return await _db.Foods.ToListAsync();
        }

        public async Task<Food?> GetFoodById(int id)
        {
            return await _db.Foods.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
