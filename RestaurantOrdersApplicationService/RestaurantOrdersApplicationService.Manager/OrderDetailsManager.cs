using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Manager
{
    public class OrderDetailsManager : BaseManager<OrderDetails>, IOrderDetailsManager
    {
        private readonly IOrderDetailsRepository _orderDetailsRepository;

        public OrderDetailsManager(IOrderDetailsRepository orderDetailsRepository) : base(orderDetailsRepository)
        {
            _orderDetailsRepository = orderDetailsRepository;
        }
    }
}
