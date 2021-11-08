using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Repository.Contract
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<bool> IsExistProductName(string name);
    }
}
