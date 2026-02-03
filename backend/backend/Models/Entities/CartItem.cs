namespace backend.Models.Entities
{
    public class CartItem
    {
        public int CartId { get; set; }
        public Cart? Cart { get; set; }

        public int FoodId { get; set; }
        public Food? Food { get; set; }

        public int Quantity { get; set; }
    }
}
