using RestaurantOrdersApplicationService.Domain;
using System.Threading.Tasks;

namespace RestaurantOrdersApplicationService.Manager.Contract
{
    public interface IProductManager : IBaseManager<Product>
    {
        Task<bool> IsExistProductName(string name);
    }
}
