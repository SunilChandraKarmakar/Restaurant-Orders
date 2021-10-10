using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Domain
{
    public class Customer
    {
        public int Id {  get; set; }    

        [Required(ErrorMessage = "Provied Name.")]
        [StringLength(30, MinimumLength = 2)]
        public string Name {  get; set; }   

        [Required(ErrorMessage = "Provied Phone Number.")]
        [StringLength(11, MinimumLength = 11)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Provied Email Address.")]
        [StringLength(30, MinimumLength = 11)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Provied Full Address.")]
        [StringLength(50, MinimumLength = 2)]
        [DataType(DataType.MultilineText)]
        public string Address { get; set; }
    }
}