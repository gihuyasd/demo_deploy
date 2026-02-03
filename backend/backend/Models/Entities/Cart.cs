namespace backend.Models.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int CustomerID { get; set; }

        public Customer Customer { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
    }
}
