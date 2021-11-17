using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.Order;
using RestaurantOrdersApplicationService.Api.ViewModels.OrderDetails;
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
        private readonly IOrderDetailsManager _orderDetailsManager;
        private readonly IMapper _mapper;

        public OrderController(IOrderManager orderManager, IOrderDetailsManager orderDetailsManager, IMapper mapper)
        {
            _orderManager = orderManager;
            _orderDetailsManager = orderDetailsManager;
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
        public async Task<ActionResult<OrderViewModel>> Post([FromBody] OrderCreateModel order)
        {
            bool isCreatedOrderInfo = false;
            bool isCreatedOrderDetailsInfo = false;                

            if (ModelState.IsValid)
            {
                Order createOrderInfo = _mapper.Map<Order>(order);
                isCreatedOrderInfo = await _orderManager.Create(createOrderInfo);

                foreach (OrderDetailsCreateModel orderDetail in order.OrderDetails)
                {
                    OrderDetails createOrderDetailsInfo = _mapper.Map<OrderDetails>(orderDetail);
                    createOrderDetailsInfo.OrderId = createOrderInfo.Id;
                    isCreatedOrderDetailsInfo = await _orderDetailsManager.Create(createOrderDetailsInfo);
                }

                if (!isCreatedOrderInfo || !isCreatedOrderDetailsInfo)
                    return BadRequest(new { ErrorMessage = "Order can not be created!" });

                OrderViewModel createdOrderInfo = _mapper.Map<OrderViewModel>(createOrderInfo);
                return Ok(createdOrderInfo);
            }

            return BadRequest(new { ErrorMessage = "Order form can not fulfill properly!" });
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
