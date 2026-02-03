using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CartItem>().
                HasKey(x => new { x.CartId, x.FoodId });

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Food)
                .WithMany(f => f.CartItems)
                .HasForeignKey(ci => ci.FoodId);

            modelBuilder.Entity<CartItem>()
                .Property(x => x.Quantity)
                .HasDefaultValue(1);

            modelBuilder.Entity<Food>()
                .Property(x => x.Price)
                .HasColumnType("numeric(12,2)");
        }
    }
}
