using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Manager.Contract
{
    public interface IPaymentGetwayManager : IBaseManager<PaymentGetway>
    {
        Task<bool> IsExistName(string name);
    }
}
