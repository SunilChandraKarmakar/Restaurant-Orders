using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        //public override Task<IEnumerable<Order>> Get()
        //{
        //    return
        //}
    }
}
