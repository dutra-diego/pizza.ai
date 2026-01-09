using Client.DTOs.Flavor;

namespace Client.DTOs.Product
{
    public record ProductWithFlavorsDto(
        Guid Id,
        string Name,
        string Category,
        decimal Price,
        bool Available,
        List<ResponseFlavorDto> Flavors
    );
}
