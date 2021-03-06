using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Repository.Contract
{
    public interface IPaymentGetwayRepository : IBaseRepository<PaymentGetway>
    {
        Task<bool> IsExistName(string name);
    }
}
