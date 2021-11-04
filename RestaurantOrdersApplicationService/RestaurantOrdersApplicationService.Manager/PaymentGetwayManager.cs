using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Manager
{
    public class PaymentGetwayManager : BaseManager<PaymentGetway>, IPaymentGetwayManager
    {
        private readonly IPaymentGetwayRepository _paymentGetwayRepository;

        public PaymentGetwayManager(IPaymentGetwayRepository paymentGetwayRepository) : base(paymentGetwayRepository)
        {
            _paymentGetwayRepository = paymentGetwayRepository;
        }

        public async Task<bool> IsExistName(string name)
        {
            return await _paymentGetwayRepository.IsExistName(name);
        }
    }
}
