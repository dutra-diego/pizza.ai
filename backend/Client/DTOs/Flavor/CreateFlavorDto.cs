using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Flavor
{
    public record CreateFlavorDto
    (
        Guid ProductId,
        string Name,
        decimal Price,
        bool IsAvailable = true
    );
}
