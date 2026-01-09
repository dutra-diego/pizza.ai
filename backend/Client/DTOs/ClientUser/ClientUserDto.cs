using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.ClientUser
{
    public record ClientUserDTO
    (
        string Name,
        string Email,
        string Password
    );
}
