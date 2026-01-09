using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Flavor
{
    public record ResponseFlavorDto
    (
        Guid ProductId,
        Guid Id,
        string Name,
        decimal Price,
        bool IsAvailable
    );
}
