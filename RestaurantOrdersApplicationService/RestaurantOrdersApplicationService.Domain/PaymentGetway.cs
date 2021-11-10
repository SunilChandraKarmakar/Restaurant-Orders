using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Domain
{
    public class PaymentGetway
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Provied Name.")]
        [StringLength(30, MinimumLength = 2)]
        public string Name { get; set;}

        public virtual ICollection<Order> Orders { get; set; }
    }
}
