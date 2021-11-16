using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.Order;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestaurantOrdersApplicationService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderManager _orderManager;
        private readonly IMapper _mapper;

        public OrderController(IOrderManager orderManager, IMapper mapper)
        {
            _orderManager = orderManager;
            _mapper = mapper;
        }

        // GET: api/<OrderController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> Get()
        {
            IEnumerable<OrderViewModel> orders = _mapper.Map<IEnumerable<OrderViewModel>>(await _orderManager.Get());
            return Ok(orders);
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult<OrderViewModel>> Post([FromBody] OrderUpsertModel order)
        {
            if (ModelState.IsValid)
            {
                Order createOrderInfo = _mapper.Map<Order>(order);
                var isCreated = createOrderInfo;

                //if (!isCreated)
                //    return BadRequest(new { ErrorMessage = "Customer can not be created!" });

                //CustomerViewModel createdCustomerInfo = _mapper.Map<CustomerViewModel>(createCustomerInfo);
                //return Ok(createdCustomerInfo);
            }

            return BadRequest(new { ErrorMessage = "Customer form can not fulfill properly!" });
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
