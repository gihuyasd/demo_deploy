using backend.Models.DTOs;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class BookingService: IBookingService
    {
        private readonly IBookingRepository _repo;
        private readonly ICartRepository _cartRepo;

        public BookingService(IBookingRepository repo, ICartRepository cartRepo)
        {
            _repo = repo;
            _cartRepo = cartRepo;
        }
        public async Task<bool> CreateBooking(int customerId, BookingCreateDto dto)
        {
            var booking = new Booking
            {
                CustomerId = customerId,
                TotalPrice = dto.Total,
                Note = dto.Note,
                Address = dto.Address
            };

            await _repo.AddBooking(booking);
            await _cartRepo.ClearCart(customerId);
            return true;
        }
    }
}
