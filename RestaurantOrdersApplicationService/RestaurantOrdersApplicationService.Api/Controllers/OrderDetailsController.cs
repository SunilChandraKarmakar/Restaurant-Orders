using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestaurantOrdersApplicationService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsManager _orderDetailsManager;
        private readonly IMapper _mapper;

        public OrderDetailsController(IOrderDetailsManager orderDetailsManager, IMapper mapper)
        {
            _orderDetailsManager = orderDetailsManager;
            _mapper = mapper;
        }

        // GET: api/<OrderDetailsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OrderDetailsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderDetailsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderDetailsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<OrderDetailsViewModel>> Delete(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Order Details Id can not found!" });

            OrderDetails existOrderDetailsInfo = await _orderDetailsManager.Get(id);

            if (existOrderDetailsInfo == null)
                return NotFound(new { ErrorMessage = "Order Details can not found!" });

            bool isDeleted = await _orderDetailsManager.Delete(existOrderDetailsInfo);

            if (!isDeleted)
                return BadRequest(new { ErrorMessage = "Order Details can not deleted!" });

            OrderDetailsViewModel deletedOrderDetailsInfo = _mapper.Map<OrderDetailsViewModel>(existOrderDetailsInfo);
            return Ok(deletedOrderDetailsInfo);
        }
    }
}
