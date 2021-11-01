using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.Customer;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestaurantOrdersApplicationService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerManager _customerManager;
        private readonly IMapper _mapper;

        public CustomerController(ICustomerManager customerManager, IMapper mapper)
        {
            _customerManager = customerManager;
            _mapper = mapper;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CustomerViewModel>>> Get()
        {
            IEnumerable<CustomerViewModel> customers = _mapper.Map<IEnumerable<CustomerViewModel>>(await _customerManager.Get());
            return Ok(customers);
        }

        // GET api/<CustomerController>/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CustomerViewModel>> Get(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Customer Id can not found! Try again." });

            CustomerViewModel customerInfo = _mapper.Map<CustomerViewModel>(await _customerManager.Get(id));

            if (customerInfo == null)
                return NotFound(new { ErrorMessage = "Customer can not found! Try again." });

            return Ok(customerInfo);
        }

        // POST api/<CustomerController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CustomerViewModel>> Post([FromBody] CustomerUpsertModel customer)
        {
            if(ModelState.IsValid)
            {
                Customer createCustomerInfo = _mapper.Map<Customer>(customer);
                bool isCreated = await _customerManager.Create(createCustomerInfo);

                if (!isCreated)
                    return BadRequest(new { ErrorMessage = "Customer can not be created!" });

                CustomerViewModel createdCustomerInfo = _mapper.Map<CustomerViewModel>(createCustomerInfo);
                return Ok(createdCustomerInfo);
            }

            return BadRequest(new { ErrorMessage = "Customer form can not fulfill properly!" });
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult<CustomerViewModel>> Put(int? id, [FromBody] CustomerUpsertModel customer)
        {
            if(ModelState.IsValid)
            {
                if (id != customer.Id)
                    return NotFound(new { ErrorMessage = "Customer Id can not match!" });

                Customer updateCustomerInfo = _mapper.Map<Customer>(customer);
                bool isUpdate = await _customerManager.Update(updateCustomerInfo);

                if (!isUpdate)
                    return BadRequest(new { ErrorMessage = "Customer can not be updated!" });

                CustomerViewModel updatedCustomerInfo = _mapper.Map<CustomerViewModel>(updateCustomerInfo);
                return Ok(updatedCustomerInfo);
            }

            return BadRequest(new { ErrorMessage = "Customer form can not fulfill properly!" });
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CustomerViewModel>> Delete(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Customer Id can not found!" });

            Customer existCustomerInfo = await _customerManager.Get(id);

            if (existCustomerInfo == null)
                return NotFound(new { ErrorMessage = "Customer can not found!" });

            bool isDeleted = await _customerManager.Delete(existCustomerInfo);

            if (!isDeleted)
                return BadRequest(new { ErrorMessage = "Customer can not deleted!" });

            CustomerViewModel deletedCustomerInfo = _mapper.Map<CustomerViewModel>(existCustomerInfo);
            return Ok(deletedCustomerInfo);
        }

        // GET api/<CustomerController>/emailaddress
        [HttpGet("{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> ExistCustomerEmail(string email)
        {
            if (email == "" || email == null)
                return Ok(false);

            bool result = await _customerManager.IsExistCustomerEmail(email);
            return Ok(result);
        }
    }
}
