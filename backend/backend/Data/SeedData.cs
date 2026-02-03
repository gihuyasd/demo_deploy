using backend.Data;
using backend.Models.Entities;
public static class SeedData
{
    public static void Init(AppDbContext db)
    {
        if (!db.Foods.Any())
        {
            db.Foods.AddRange(
                new Food {Name = "Burger Bò", Price = 55000, Image = "https://www.lotteria.vn/media/catalog/product/b/u/burger_b_teriyaki.jpg" },
                new Food {Name = "Pizza Hải Sản", Price = 129000, Image = "https://thepizzacompany.vn/images/thumbs/000/0002211_tropical-sf-test_500.png" },
                new Food {Name = "Gà Rán", Price = 40000, Image = "https://www.lotteria.vn/media/catalog/product/g/_/g_r_n_1_mi_ng.jpg" },
                new Food {Name = "Khoai Tây Chiên", Price = 25000, Image = "https://www.lotteria.vn/media/catalog/product/l/s/ls0002_1.png" }
            );
        }

        if (!db.Customers.Any())
        {
            db.Customers.Add(
                new Customer
                {
                    Name = "Test User",
                    Email = "test@mail.com",
                    Phone = "2312301232",
                    Username = "test",
                    Password = "123"
                }
            );
        }

        db.SaveChanges();
    }
}
