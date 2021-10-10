using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.DatabaseContext;
using RestaurantOrdersApplicationService.Repository.Contract;

namespace RestaurantOrdersApplicationService.Repository
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly RestaurantOrdersContext _db;

        public BaseRepository()
        {
            _db = new RestaurantOrdersContext();
        }

        public virtual async Task<IEnumerable<T>> Get()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public virtual async Task<T> Get(int? id)
        {
            return await _db.Set<T>().FindAsync(id);
        }

        public virtual async Task<bool> Create(T entity)
        {
            _db.Set<T>().Add(entity);
            return await _db.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Update(T entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
            return await _db.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Delete(T entity)
        {
            _db.Set<T>().Remove(entity);
            return await _db.SaveChangesAsync() > 0;
        }
    }
}
