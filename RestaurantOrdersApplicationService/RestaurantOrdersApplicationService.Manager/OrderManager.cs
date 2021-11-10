using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Manager
{
    public class OrderManager : BaseManager<Order>, IOrderManager
    {
        private readonly IOrderRepository _orderRepository;

        public OrderManager(IOrderRepository orderRepository) : base(orderRepository)
        {
            _orderRepository = orderRepository;
        }
    }
}
