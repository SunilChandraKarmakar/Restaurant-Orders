namespace RestaurantOrdersApplicationService.Manager.Contract
{
    public interface IBaseManager<T> where T : class
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(int? id);
        Task<bool> Create(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
    }
}
