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
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderViewModel>> Get(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Order Id can not found! Try again." });

            OrderViewModel orderInfo = _mapper.Map<OrderViewModel>(await _orderManager.Get(id));

            if (orderInfo == null)
                return NotFound(new { ErrorMessage = "Order can not found! Try again." });

            return Ok(orderInfo);
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult<OrderViewModel>> Post([FromBody] OrderCreateModel order)
        {           
            if (ModelState.IsValid)
            {
                Order createOrderInfo = _mapper.Map<Order>(order);
                bool isCreatedOrderInfo = await _orderManager.Create(createOrderInfo);

                if (!isCreatedOrderInfo)
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
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<OrderViewModel>> Delete(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Order Id can not found!" });

            Order existOrderInfo = await _orderManager.Get(id);

            if (existOrderInfo == null)
                return NotFound(new { ErrorMessage = "Order can not found!" });

            bool isDeleted = await _orderManager.Delete(existOrderInfo);

            if (!isDeleted)
                return BadRequest(new { ErrorMessage = "Order can not deleted!" });

            OrderViewModel deletedOrderInfo = _mapper.Map<OrderViewModel>(existOrderInfo);
            return Ok(deletedOrderInfo);
        }
    }
}
