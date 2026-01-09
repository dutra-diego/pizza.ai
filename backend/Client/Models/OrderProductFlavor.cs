using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    public class OrderProductFlavor
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid OrderProductId { get; set; }
        public virtual OrderProduct OrderProduct { get; set; }
        [Required]
        public Guid FlavorId { get; set; }
        public virtual Flavor Flavor { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int SliceCount { get; set; }
        [Required]
        public decimal FlavorPriceAtTime { get; set; }
        public decimal Subtotal => FlavorPriceAtTime * SliceCount;
    }
}
