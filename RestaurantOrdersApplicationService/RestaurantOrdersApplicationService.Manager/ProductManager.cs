using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Manager
{
    public class ProductManager : BaseManager<Product>, IProductManager
    {
        private readonly IProductRepository _productRepository;

        public ProductManager(IProductRepository productRepository) : base(productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<bool> IsExistProductName(string name)
        {
            return await _productRepository.IsExistProductName(name);
        }
    }
}
