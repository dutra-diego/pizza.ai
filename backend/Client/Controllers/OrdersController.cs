using Client.DTOs.Order;
using Client.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private bool TryGetUserId(out Guid userId)
        {
            var userIdString = User.FindFirst("userId")?.Value;
            return Guid.TryParse(userIdString, out userId);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto createOrderDto)
        {
            if (!TryGetUserId(out var userId))
                return Unauthorized(new { error = "Invalid token" });

            var (orderId, status, orderTotal) = await _orderService.CreateAsync(userId, createOrderDto);
            return Created(string.Empty, new { orderId, status, orderTotal });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            if (!TryGetUserId(out var userId))
                return Unauthorized(new { error = "Invalid token" });

            var orders = await _orderService.GetByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("{phone}")]
        [Authorize]
        public async Task<IActionResult> GetById(string phone)
        {
            if (!TryGetUserId(out var userId))
                return Unauthorized(new { error = "Invalid token" });

            var order = await _orderService.GetByPhoneAsync(userId, phone);
            return Ok(order);
        }

        [HttpPatch("{orderId}")]
        [Authorize]
        public async Task<IActionResult> Update(int orderId, [FromBody] UpdateOrderDto updateOrderDto)
        {
            if (!TryGetUserId(out var userId))
                return Unauthorized(new { error = "Invalid token" });

            await _orderService.UpdateAsync(userId, orderId, updateOrderDto);
            return NoContent();
        }
    }
}