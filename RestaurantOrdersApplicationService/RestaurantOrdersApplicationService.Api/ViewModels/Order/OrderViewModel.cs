using RestaurantOrdersApplicationService.Api.ViewModels.Customer;
using RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails;
using RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway;

namespace RestaurantOrdersApplicationService.Api.ViewModels.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public int CustomerId { get; set; }
        public int PaymentGetwayId { get; set; }
        public double TotalPrice { get; set; }

        public virtual CustomerViewModel Customer { get; set; }
        public virtual PaymentGetwayViewModel PaymentGetway { get; set; }
        public ICollection<OrderDetailsViewModel> OrderDetails { get; set; }
    }
}
