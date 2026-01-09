using Client.DTOs.Enterprise;
using System;
using System.Threading.Tasks;

namespace Client.Services.Interfaces
{
    public interface IEnterpriseService
    {
        Task CreateAsync(Guid userId, EnterpriseDTO enterpriseDto);
        Task<EnterpriseResponseDto> GetByUserIdAsync(Guid userId);
    }
}
