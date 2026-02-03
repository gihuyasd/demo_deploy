namespace backend.Models.Entities
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
