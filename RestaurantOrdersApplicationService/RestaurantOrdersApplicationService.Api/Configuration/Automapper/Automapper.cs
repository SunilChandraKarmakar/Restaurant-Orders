using AutoMapper;
using RestaurantOrdersApplicationService.Api.ViewModels.Customer;
using RestaurantOrdersApplicationService.Api.ViewModels.Order;
using RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails;
using RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway;
using RestaurantOrdersApplicationService.Api.ViewModels.Product;
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

            // For Product
            CreateMap<Product, ProductViewModel>();
            CreateMap<ProductUpsertModel, Product>();

            // For Order
            CreateMap<Order, OrderViewModel>();
            CreateMap<OrderViewModel, Order>();
            CreateMap<Order, OrderCreateModel>();
            CreateMap<OrderCreateModel, Order>();

            // For Order Details
            CreateMap<OrderDetails, OrderDetailsViewModel>();
            CreateMap<OrderDetailsViewModel, OrderDetails>();
            CreateMap<OrderDetails, OrderDetailsCreateModel>();
            CreateMap<OrderDetailsCreateModel, OrderDetails>();
        }
    }
}
