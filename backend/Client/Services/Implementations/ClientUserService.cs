using Client.Data;
using Client.DTOs.ClientUser;
using Client.Models;
using Client.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static BCrypt.Net.BCrypt;

namespace Client.Services.Implementations
{
    public class ClientUserService : IClientUserService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IAuthenticationService _authenticationService;

        public ClientUserService(AppDbContext appDbContext, IAuthenticationService authenticationService)
        {
            _appDbContext = appDbContext;
            _authenticationService = authenticationService;
        }

        public async Task CreateAsync(ClientUserDTO clientUser)
        {
            if (clientUser == null)
                throw new ArgumentNullException(nameof(clientUser), "Client user data is required");

            var isUserExist = await _appDbContext.ClientUsers
                .FirstOrDefaultAsync(c => c.Email == clientUser.Email);

            if (isUserExist != null)
                throw new InvalidOperationException("User with this email already exists");

            var hashedPassword = HashPassword(clientUser.Password, 12);

            var newClient = new ClientUser
            {
                Name = clientUser.Name,
                Email = clientUser.Email,
                Password = hashedPassword
            };

            _appDbContext.ClientUsers.Add(newClient);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<string> LoginAsync(ClientUserLoginDto loginDto)
        {
            if (loginDto == null)
                throw new ArgumentNullException(nameof(loginDto));

            var clientUser = await _appDbContext.ClientUsers
                .FirstOrDefaultAsync(c => c.Email == loginDto.Email);

            if (clientUser == null)
                throw new KeyNotFoundException("User not found");

            if (!Verify(loginDto.Password, clientUser.Password))
                throw new KeyNotFoundException("User not found");

            var token = _authenticationService.GenerateToken(clientUser.Id, clientUser.Email);
            return token;
        }

        public async Task<ClientUserResponseDto> GetByIdAsync(Guid clientUserId)
        {
            var clientUser = await _appDbContext.ClientUsers
                .FirstOrDefaultAsync(c => c.Id == clientUserId);

            if (clientUser == null)
                throw new KeyNotFoundException("User not found");

            return new ClientUserResponseDto(clientUser.Email, clientUser.Name);
        }
    }
}
