using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Product
{
    public record ResponseProductDto
    (
        [Required]
        Guid Id,
        [Required]
        string Name,
        [Required]
        string Category,
        [Required]
        decimal Price,
        [Required]
        Boolean Available
        );
}
