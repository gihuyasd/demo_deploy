using backend.Models.DTOs;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Xml;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class CartController: ControllerBase
    {
        private readonly ICartService _service;

        public CartController(ICartService service)
        {
            _service = service;
        }

        [HttpGet("item-count")]
        public async Task<IActionResult> GetItemCount()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            int id = int.Parse(userId);

            var count = await _service.GetCartItemCount(id);

            return Ok(new { totalItems = count });
        }

        [HttpPost("increase")]
        public async Task<IActionResult> Increase([FromBody] CartItemInfoDto dto)
        {
            await _service.IncreaseItem(GetUserId(), dto.FoodId);
            return Ok();
        }

        [HttpPost("decrease")]
        public async Task<IActionResult> Decrease([FromBody] CartItemInfoDto dto)
        {
            await _service.DecreaseItem(GetUserId(), dto.FoodId);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromBody] CartItemInfoDto dto)
        {
            await _service.RemoveItem(GetUserId(), dto.FoodId);
            return Ok();
        }
        [HttpGet("cart-item")]
        public async Task<IActionResult> GetMyCart()
        {
            var userId = GetUserId();

            var data = await _service.GetCart(userId);

            return Ok(data);
        }


        private int GetUserId()
        {
            return int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );
        }
    }
}
