using System.ComponentModel.DataAnnotations;

namespace Client.DTOs.Enterprise
{
    public record EnterpriseDTO
    (
        [Required]
        string Name,
        [Required]
        string Address
     );

}
