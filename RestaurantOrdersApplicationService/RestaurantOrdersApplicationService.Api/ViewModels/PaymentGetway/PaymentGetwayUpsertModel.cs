using System.ComponentModel.DataAnnotations;

namespace RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway
{
    public class PaymentGetwayUpsertModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Provied Name.")]
        [StringLength(30, MinimumLength = 2)]
        public string Name { get; set; }
    }
}
