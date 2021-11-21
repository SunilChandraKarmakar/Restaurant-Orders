﻿using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        public override async Task<IEnumerable<Order>> Get()
        {
            return await _db.Orders
                            .Include(o => o.Customer)
                            .Include(o => o.PaymentGetway)
                            .Include(o => o.OrderDetails)
                                .ThenInclude(od => od.Product)
                            .ToListAsync();
        }

        public override async Task<Order> Get(int? id)
        {
            return await _db.Orders
                         .Include(o => o.Customer)
                         .Include(o => o.PaymentGetway)
                         .Include(o => o.OrderDetails)
                            .ThenInclude(od => od.Product)
                         .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
