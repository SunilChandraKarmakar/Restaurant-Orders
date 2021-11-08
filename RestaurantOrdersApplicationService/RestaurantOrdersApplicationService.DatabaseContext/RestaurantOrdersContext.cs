using Microsoft.EntityFrameworkCore;
using RestaurantOrdersApplicationService.Domain;

namespace RestaurantOrdersApplicationService.DatabaseContext
{
    public class RestaurantOrdersContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<PaymentGetway> PaymentGetways { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasIndex(c => new { c.Email, c.PhoneNumber }).IsUnique();
            modelBuilder.Entity<PaymentGetway>().HasIndex(pg => pg.Name).IsUnique();
            modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;
                                        Initial Catalog=RestaurantOrderDB;
                                        Integrated Security=True;
                                        Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;
                                        ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
            optionsBuilder.UseSqlServer(connectionString);
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}