using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Client.Models
{
    [Index(nameof(ClientUserId), IsUnique = true)]
    public class Enterprise
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
    
        [Required]
        public Guid ClientUserId { get; set; }
        public virtual ClientUser ClientUser { get; set; }
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>(); 

    }
}
