using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Domain
{
    public class OrderDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Select Order")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Select Product")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Provied Quantity")]
        [DataType(DataType.PhoneNumber)]
        public int Quantity { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
