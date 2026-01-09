namespace Client.DTOs.Product
{
    public record UpdateProductDto
    (
     string? Name,
     decimal? Price,
     bool? Available
    );
}
