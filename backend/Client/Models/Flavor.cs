using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    public class Flavor
    {
        [Key]
        public Guid Id { get; set; } 
        
        [Required(ErrorMessage = "Flavor required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Flavor price required")]
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }
        [Required]
        public bool IsAvailable { get; set; }
        [Required]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }

        [Required]
        public Guid EnterpriseId { get; set; }
        public virtual Enterprise Enterprise { get; set; }

        public virtual ICollection<OrderProductFlavor> OrderProductFlavors { get; set; } = new List<OrderProductFlavor>();
    }
}
