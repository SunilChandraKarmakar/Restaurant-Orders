using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class OrderDetailsRepository : BaseRepository<OrderDetails>, IOrderDetailsRepository
    {
        public override async Task<IEnumerable<OrderDetails>> Get()
        {
            return await _db.OrderDetails.Include(od => od.Order).Include(od => od.Product).ToListAsync();
        }

        public override async Task<OrderDetails> Get(int? id)
        {
            return await _db.OrderDetails.Include(od => od.Order).Include(od => od.Product)
                            .FirstOrDefaultAsync(od => od.Id == id);
        }
    }
}
