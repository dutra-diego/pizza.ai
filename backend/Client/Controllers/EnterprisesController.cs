using Client.DTOs.Enterprise;
using Client.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Route("enterprises")]
    [ApiController]
    public class EnterprisesController : ControllerBase
    {
        private readonly IEnterpriseService _enterpriseService;

        public EnterprisesController(IEnterpriseService enterpriseService)
        {
            _enterpriseService = enterpriseService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] EnterpriseDTO enterprise)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            await _enterpriseService.CreateAsync(parsedUserId, enterprise);
            return Created(string.Empty, new { message = "Enterprise created successfully" });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized(new { error = "Invalid token" });

            var enterprise = await _enterpriseService.GetByUserIdAsync(parsedUserId);
            return Ok(enterprise);
        }
    }
}
