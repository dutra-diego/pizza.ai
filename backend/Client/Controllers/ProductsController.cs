using Client.DTOs;
using Client.DTOs.Flavor;
using Client.DTOs.Product;
using Client.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] ProductDto product)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            await _productService.CreateAsync(parsedUserId, product);
            return NoContent();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            var products = await _productService.GetByUserIdAsync(parsedUserId);
            return Ok(products);
        }

        [HttpGet("flavors")]
        [Authorize]
        public async Task<IActionResult> GetWithFlavours()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            var products = await _productService.GetWithFlavorsByUserIdAsync(parsedUserId);
            return Ok(products);
        }

        [HttpPatch("{productId}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid productId, [FromBody] UpdateProductDto updateProductDto)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            await _productService.UpdateAsync(parsedUserId, productId, updateProductDto);
            return NoContent();
        }
    }
}
