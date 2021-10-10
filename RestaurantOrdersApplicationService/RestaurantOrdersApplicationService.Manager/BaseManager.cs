using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Manager
{
    public abstract class BaseManager<T> : IBaseManager<T> where T : class
    {
        private readonly IBaseRepository<T> _baseRepository;

        public BaseManager(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public virtual async Task<IEnumerable<T>> Get()
        {
            return await _baseRepository.Get();
        }

        public virtual async Task<T> Get(int? id)
        {
            return await _baseRepository.Get(id);
        }

        public virtual async Task<bool> Create(T entity)
        {
            return await _baseRepository.Create(entity);
        }

        public virtual async Task<bool> Update(T entity)
        {
            return await _baseRepository.Update(entity);
        }

        public virtual async Task<bool> Delete(T entity)
        {
            return await _baseRepository.Delete(entity);
        }
    }
}
