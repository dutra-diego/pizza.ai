using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [MinLength(8)]
        public string Phone { get; set; }
        [Required]
        public string DeliveryAddress { get; set; }
        [Required]
        [AllowedValues("Cancelado", "Em produção", "Saiu para entrega", "Concluido")]
        public string Status { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public Guid EnterpriseId { get; set; }
        public virtual Enterprise Enterprise { get; set; }
        public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

    }
}
