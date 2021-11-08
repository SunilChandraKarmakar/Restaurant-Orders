using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Manager.Contract
{
    public interface IProductManager : IBaseManager<Product>
    {
        Task<bool> IsExistProductName(string name);
    }
}
