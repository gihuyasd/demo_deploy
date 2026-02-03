using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task AddBooking(Booking booking);
    }
}
