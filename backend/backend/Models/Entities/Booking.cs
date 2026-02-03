namespace backend.Models.Entities
{
    public class Booking
    {   
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int TotalPrice { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }
    }
}
