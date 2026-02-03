using backend.Models.DTOs;

namespace backend.Services.Interfaces
{
    public interface IBookingService
    {
        Task<bool> CreateBooking(int customerId, BookingCreateDto dto);
    }
}
