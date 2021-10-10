using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
    }
}