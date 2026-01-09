using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Product
    {
        [Key]
        public Guid Id { get; set; } 
        [Required(ErrorMessage = "Product name is required.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Category is required")]
        [AllowedValues("Alimento", "Bebida", ErrorMessage = "Invalid Category. Use 'Alimento' or 'Bebida'.")]
        public string Category { get; set; }
        [Required(ErrorMessage = "Product price is required")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Product disponibility is required")]
        public bool Available { get; set; }
        [Required(ErrorMessage = "Enterprise ID is necessary")]
        public Guid EnterpriseId { get; set; }

        public virtual Enterprise Enterprise { get; set; }

        public virtual ICollection<Flavor> Flavors { get; set; } = new List<Flavor>();

        public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
