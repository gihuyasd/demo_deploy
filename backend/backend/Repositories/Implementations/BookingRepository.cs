using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations
{
    public class BookingRepository: IBookingRepository
    {
        private readonly AppDbContext _db;
        public BookingRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task AddBooking(Booking booking)
        {
            await _db.Bookings.AddAsync(booking);
            await _db.SaveChangesAsync();
        }
    }
}
