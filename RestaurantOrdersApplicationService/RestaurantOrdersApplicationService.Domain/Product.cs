using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Domain
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Provied Name.")]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Provied Price.")]
        [DataType(DataType.Currency)]
        public double Price { get; set; }
    }
}
