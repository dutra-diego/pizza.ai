using Client.Data;
using Client.DTOs.Flavor;
using Client.Models;
using Client.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Client.Services.Implementations
{
    public class FlavorService : IFlavorService
    {
        private readonly AppDbContext _appDbContext;

        public FlavorService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<ResponseFlavorDto>> GetByProductIdAsync(Guid userId, Guid productId)
        {
            var flavors = await _appDbContext.Flavors
                .Where(f => f.Enterprise.ClientUserId == userId && f.ProductId == productId)
                .Select(p => new ResponseFlavorDto(p.ProductId, p.Id, p.Name, p.Price, p.IsAvailable))
                .ToListAsync();

            return flavors;
        }

        public async Task<ResponseFlavorDto> CreateAsync(Guid userId, CreateFlavorDto flavorDto)
        {
            var product = await _appDbContext.Products
                .FirstOrDefaultAsync(p => p.Id == flavorDto.ProductId && p.Enterprise.ClientUserId == userId);

            if (product == null)
                throw new KeyNotFoundException("Product not found or does not belong to your enterprise");

            var flavor = new Flavor
            {
                ProductId = flavorDto.ProductId,
                Name = flavorDto.Name,
                Price = flavorDto.Price,
                IsAvailable = flavorDto.IsAvailable,
                EnterpriseId = product.EnterpriseId
            };

            _appDbContext.Flavors.Add(flavor);
            await _appDbContext.SaveChangesAsync();

            return new ResponseFlavorDto(flavor.ProductId, flavor.Id, flavor.Name, flavor.Price, flavor.IsAvailable);
        }

        public async Task UpdateAsync(Guid userId, Guid flavorId, UpdateFlavorDto flavorDto)
        {
            var rowsAffected = await _appDbContext.Flavors
                .Where(f => f.Enterprise.ClientUserId == userId && f.Id == flavorId)
                .ExecuteUpdateAsync(flavor =>
                {
                    if (flavorDto.Name != null)
                        flavor.SetProperty(f => f.Name, flavorDto.Name);

                    if (flavorDto.Price != null)
                        flavor.SetProperty(f => f.Price, flavorDto.Price.Value);

                    if (flavorDto.IsAvailable != null)
                        flavor.SetProperty(f => f.IsAvailable, flavorDto.IsAvailable.Value);
                });

            if (rowsAffected == 0)
                throw new KeyNotFoundException("Flavor not found");
        }
    }
}
