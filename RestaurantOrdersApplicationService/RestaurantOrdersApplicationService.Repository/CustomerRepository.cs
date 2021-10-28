using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public async Task<bool> IsExistCustomerEmail(string email)
        {
            string existCustomerEmail = await _db.Customers
                                              .Where(c => c.Email.ToLower() == email.ToLower())
                                              .Select(s => s.Email)
                                              .FirstOrDefaultAsync();

            if (existCustomerEmail == null)
                return false;

            return true;
        }
    }
}