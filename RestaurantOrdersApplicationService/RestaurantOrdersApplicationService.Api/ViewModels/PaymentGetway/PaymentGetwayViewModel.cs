using RestaurantOrdersApplicationService.Api.ViewModels.Order;

namespace RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway
{
    public class PaymentGetwayViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<OrderViewModel> Orders { get; set; }
    }
}
