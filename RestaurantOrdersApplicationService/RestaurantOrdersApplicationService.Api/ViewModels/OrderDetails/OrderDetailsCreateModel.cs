using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails
{
    public class OrderDetailsCreateModel
    {
        [Required(ErrorMessage = "Select Order")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Select Product")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Provied Quantity")]
        [DataType(DataType.PhoneNumber)]
        public int Quantity { get; set; }
    }
}
