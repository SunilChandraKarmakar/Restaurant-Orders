using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class PaymentGetwayRepository : BaseRepository<PaymentGetway>, IPaymentGetwayRepository
    {
        public async Task<bool> IsExistName(string name)
        {
            PaymentGetway existInfo = await _db.PaymentGetways.Where(pg => pg.Name == name).FirstOrDefaultAsync();

            if (existInfo.Name != null)
                return true;

            return false;
        }
    }
}
