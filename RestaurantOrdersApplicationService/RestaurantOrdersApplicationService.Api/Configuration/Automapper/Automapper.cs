using AutoMapper;
using RestaurantOrdersApplicationService.Api.ViewModels.Customer;
using RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway;
using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.Api.Configuration.Automapper
{
    public class Automapper : Profile
    {
        public Automapper()
        {
            // For Customer Mapping
            CreateMap<Customer, CustomerViewModel>();
            CreateMap<CustomerUpsertModel, Customer>();

            // For PaymentGetway
            CreateMap<PaymentGetway, PaymentGetwayViewModel>();
            CreateMap<PaymentGetwayUpsertModel, PaymentGetway>();

        }
    }
}
