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

        public CustomerViewModel Customer { get; set; }
        public PaymentGetwayViewModel PaymentGetway { get; set; }
        public  IEnumerable<OrderDetailsViewModel> OrderDetails { get; set; }
    }
}
