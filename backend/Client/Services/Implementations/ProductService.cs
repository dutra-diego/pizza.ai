using Client.Data;
using Client.DTOs.Flavor;
using Client.DTOs.Product;
using Client.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Client.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _appDbContext;

        public ProductService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task CreateAsync(Guid userId, ProductDto productDto)
        {
            var enterpriseId = await _appDbContext.Enterprises
                .Where(e => e.ClientUserId == userId)
                .Select(e => e.Id)
                .FirstOrDefaultAsync();

            if (enterpriseId == Guid.Empty)
                throw new KeyNotFoundException("Enterprise not found for the user");

            var newProduct = new Models.Product
            {
                Name = productDto.Name,
                Category = productDto.Category,
                Price = productDto.Price,
                Available = productDto.Available,
                EnterpriseId = enterpriseId
            };

            _appDbContext.Products.Add(newProduct);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<ResponseProductDto>> GetByUserIdAsync(Guid userId)
        {
            var products = await _appDbContext.Products
                .Where(p => p.Enterprise.ClientUserId == userId)
                .OrderBy(p => p.Category)
                .Select(e => new ResponseProductDto(e.Id, e.Name, e.Category, e.Price, e.Available))
                .ToListAsync();

            return products;
        }

        public async Task<List<ProductWithFlavorsDto>> GetWithFlavorsByUserIdAsync(Guid userId)
        {
            var products = await _appDbContext.Products
                .Where(p => p.Enterprise.ClientUserId == userId)
                .OrderBy(p => p.Category)
                .Select(p => new ProductWithFlavorsDto(
                    p.Id,
                    p.Name,
                    p.Category,
                    p.Price,
                    p.Available,
                    p.Flavors.Select(f => new ResponseFlavorDto(f.ProductId, f.Id, f.Name, f.Price, f.IsAvailable)).ToList()
                ))
                .ToListAsync();

            return products;
        }

        public async Task UpdateAsync(Guid userId, Guid productId, UpdateProductDto updateProductDto)
        {
            var rowsAffected = await _appDbContext.Products
                .Where(p => p.Id == productId && p.Enterprise.ClientUserId == userId)
                .ExecuteUpdateAsync(product =>
                {
                    if (updateProductDto.Name != null)
                        product.SetProperty(p => p.Name, updateProductDto.Name);

                    if (updateProductDto.Price.HasValue)
                        product.SetProperty(p => p.Price, updateProductDto.Price.Value);

                    if (updateProductDto.Available.HasValue)
                        product.SetProperty(p => p.Available, updateProductDto.Available.Value);
                });

            if (rowsAffected == 0)
                throw new KeyNotFoundException("Product not found");
        }
    }
}
