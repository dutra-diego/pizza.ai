using Client.DTOs.ClientUser;

namespace Client.Services.Interfaces
{
    public interface IClientUserService
    {
        Task CreateAsync(ClientUserDTO clientUser);
        Task<string> LoginAsync(ClientUserLoginDto loginDto);
        Task<ClientUserResponseDto> GetByIdAsync(Guid clientUserId);
    }
}
