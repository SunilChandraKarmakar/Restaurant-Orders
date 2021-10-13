using AutoMapper;
using RestaurantOrdersApplicationService.Api.ViewModels.Customer;
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

        }
    }
}
