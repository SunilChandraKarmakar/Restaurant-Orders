using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Domain
{
    public class Order
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Provied Order Number")]
        [StringLength(7, MinimumLength = 7)]
        public string OrderNumber { get; set; }

        [Required(ErrorMessage = "Select Customer")]
        public int CustomerId { get; set; } 

        [Required(ErrorMessage = "Select Payment Getway")]
        public int PaymentGetwayId { get; set; }

        [Required(ErrorMessage = "Provied Total Price")]
        [DataType(DataType.Currency)]
        public double TotalPrice { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual PaymentGetway PaymentGetway { get; set; }   
        public virtual IEnumerable<OrderDetails> OrderDetails  { get; set; }
    }
}
