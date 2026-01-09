using Client.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Client.DTOs.ClientUser;
using Client.Services.Interfaces;

namespace Client.Controllers
{
    [Route("client-users")]
    [ApiController]
    public class ClientUsersController : ControllerBase
    {
        private readonly IClientUserService _clientUserService;

        public ClientUsersController(IClientUserService clientUserService)
        {
            _clientUserService = clientUserService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClientUserDTO clientUser)
        {
            var token = await _clientUserService.CreateAsync(clientUser);
            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ClientUserLoginDto client)
        {
            var token = await _clientUserService.LoginAsync(client);
            return Ok(new { token });
        }

    }
}
