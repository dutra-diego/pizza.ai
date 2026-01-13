using Client.DTOs.Product;

namespace Client.Services.Interfaces
{
    public interface IProductService
    {
        Task<ResponseProductDto> CreateAsync(Guid userId, ProductDto productDto);
        Task<List<ResponseProductDto>> GetByUserIdAsync(Guid userId);
        Task<List<ProductWithFlavorsDto>> GetWithFlavorsByUserIdAsync(Guid userId);
        Task UpdateAsync(Guid userId, Guid productId, UpdateProductDto updateProductDto);
    }
}
