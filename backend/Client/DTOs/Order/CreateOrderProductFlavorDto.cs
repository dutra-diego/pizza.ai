using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Order
{
    public record CreateOrderProductFlavorDto(
        Guid FlavorId,
        int SliceCount
   );
}
