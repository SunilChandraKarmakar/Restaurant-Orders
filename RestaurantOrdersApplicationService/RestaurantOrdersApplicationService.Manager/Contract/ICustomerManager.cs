using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Manager.Contract
{
    public interface ICustomerManager : IBaseManager<Customer>
    {
        Task<bool> IsExistCustomerEmail(string email);
    }
}
