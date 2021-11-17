﻿using RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails;

namespace RestaurantOrdersApplicationService.Api.ViewModels.Product
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        public ICollection<OrderDetailsViewModel> OrderDetails { get; set; }
    }
}
