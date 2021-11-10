using RestaurantOrdersApplicationService.Api.ViewModels.Order;
using RestaurantOrdersApplicationService.Api.ViewModels.Product;

namespace RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails
{
    public class OrderDetailsViewModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public OrderViewModel Order { get; set; }
        public ProductViewModel Product { get; set; }
    }
}
