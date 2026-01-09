using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Flavor
{
    public record UpdateFlavorDto(
      string? Name = null,
      decimal? Price = null,
      bool? IsAvailable = null
  );
}

