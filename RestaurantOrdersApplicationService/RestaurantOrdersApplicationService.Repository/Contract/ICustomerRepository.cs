using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Repository.Contract
{
    public interface ICustomerRepository : IBaseRepository<Customer>
    {
        Task<bool> IsExistCustomerEmail(string email);
    }
}
