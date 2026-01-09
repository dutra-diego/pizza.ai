using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class ClientUser
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }

    }
}
