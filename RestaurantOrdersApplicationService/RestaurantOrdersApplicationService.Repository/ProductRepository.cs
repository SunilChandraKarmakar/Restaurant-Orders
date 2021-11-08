using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public async Task<bool> IsExistProductName(string name)
        {
            Product existInfo = await _db.Products.Where(p => p.Name == name).FirstOrDefaultAsync();

            if (existInfo != null)
                return true;

            return false;
        }
    }
}
