using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.ClientUser
{
    public record ClientUserLoginDto
    (
    string Email,
    string Password
        );
}
