using backend.Models.DTOs;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingController: ControllerBase
    {
        private readonly IBookingService _service;
        public BookingController(IBookingService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<IActionResult> Booking([FromBody] BookingCreateDto dto)
        {
            var customerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var ok = await _service.CreateBooking(customerId, dto);

            if (!ok)
                return BadRequest("Cart empty or not found");

            return Ok("Booking created");
        }
    }
}
