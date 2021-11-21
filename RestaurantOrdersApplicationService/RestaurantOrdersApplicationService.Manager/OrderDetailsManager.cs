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

        public override async Task<IEnumerable<OrderDetails>> Get()
        {
            return await _orderDetailsRepository.Get();
        }

        public override async Task<OrderDetails> Get(int? id)
        {
            return await _orderDetailsRepository.Get(id);
        }
    }
}
