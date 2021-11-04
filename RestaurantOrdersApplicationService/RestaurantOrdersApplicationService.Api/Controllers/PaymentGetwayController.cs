using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.PaymentGetway;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestaurantOrdersApplicationService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentGetwayController : ControllerBase
    {
        private readonly IPaymentGetwayManager _paymentGetwayManager;
        private readonly IMapper _mapper;

        public PaymentGetwayController(IPaymentGetwayManager paymentGetwayManager, IMapper mapper)
        {
            _paymentGetwayManager = paymentGetwayManager;
            _mapper = mapper;
        }

        // GET: api/<PaymentGetwayController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PaymentGetwayViewModel>>> Get()
        {
            IEnumerable<PaymentGetwayViewModel> paymentGetways = _mapper.Map<IEnumerable<PaymentGetwayViewModel>>(await _paymentGetwayManager.Get());
            return Ok(paymentGetways);
        }

        // GET api/<PaymentGetwayViewModelController>/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PaymentGetwayViewModel>> Get(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Payment Getway Id can not found! Try again." });

            PaymentGetwayViewModel paymentGetwayInfo = _mapper.Map<PaymentGetwayViewModel>(await _paymentGetwayManager.Get(id));

            if (paymentGetwayInfo == null)
                return NotFound(new { ErrorMessage = "Payment Getway can not found! Try again." });

            return Ok(paymentGetwayInfo);
        }

        // POST api/<PaymentGetwayViewModelController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PaymentGetwayViewModel>> Post([FromBody] PaymentGetwayUpsertModel paymentGetway)
        {
            if (ModelState.IsValid)
            {
                PaymentGetway createPaymentGetwayInfo = _mapper.Map<PaymentGetway>(paymentGetway);
                bool isCreated = await _paymentGetwayManager.Create(createPaymentGetwayInfo);

                if (!isCreated)
                    return BadRequest(new { ErrorMessage = "Payment Getway can not be created!" });

                PaymentGetwayViewModel createdPaymentGetwayInfo = _mapper.Map<PaymentGetwayViewModel>(createPaymentGetwayInfo);
                return Ok(createdPaymentGetwayInfo);
            }

            return BadRequest(new { ErrorMessage = "Payment Getway form can not fulfill properly!" });
        }

        // PUT api/<PaymentGetwayViewModelController>/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult<PaymentGetwayViewModel>> Put(int? id, [FromBody] PaymentGetwayUpsertModel paymentGetway)
        {
            if (ModelState.IsValid)
            {
                if (id != paymentGetway.Id)
                    return NotFound(new { ErrorMessage = "Payment Getway Id can not match!" });

                PaymentGetway updatePaymentGetwayInfo = _mapper.Map<PaymentGetway>(paymentGetway);
                bool isUpdate = await _paymentGetwayManager.Update(updatePaymentGetwayInfo);

                if (!isUpdate)
                    return BadRequest(new { ErrorMessage = "Payment Getway can not be updated!" });

                PaymentGetwayViewModel updatedPaymentGetwayInfo = _mapper.Map<PaymentGetwayViewModel>(updatePaymentGetwayInfo);
                return Ok(updatedPaymentGetwayInfo);
            }

            return BadRequest(new { ErrorMessage = "Payment Getway form can not fulfill properly!" });
        }

        // DELETE api/<PaymentGetwayViewModelController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<PaymentGetwayViewModel>> Delete(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Payment Getway Id can not found!" });

            PaymentGetway existPaymentGetwayInfo = await _paymentGetwayManager.Get(id);

            if (existPaymentGetwayInfo == null)
                return NotFound(new { ErrorMessage = "Payment Getway can not found!" });

            bool isDeleted = await _paymentGetwayManager.Delete(existPaymentGetwayInfo);

            if (!isDeleted)
                return BadRequest(new { ErrorMessage = "Payment Getway can not deleted!" });

            PaymentGetwayViewModel deletedPaymentGetwayInfo = _mapper.Map<PaymentGetwayViewModel>(existPaymentGetwayInfo);
            return Ok(deletedPaymentGetwayInfo);
        }

        // GET api/<CustomerController>/name
        [HttpGet("{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> ExistName(string name)
        {
            if (name == "" || name == null)
                return Ok(false);

            bool result = await _paymentGetwayManager.IsExistName(name);
            return Ok(result);
        }
    }
}
