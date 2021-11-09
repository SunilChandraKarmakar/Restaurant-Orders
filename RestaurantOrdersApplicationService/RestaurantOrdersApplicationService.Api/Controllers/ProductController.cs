using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantOrdersApplicationService.Api.ViewModels.Product;
using RestaurantOrdersApplicationService.Domain;
using RestaurantOrdersApplicationService.Manager.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestaurantOrdersApplicationService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductManager _productManager;
        private readonly IMapper _mapper;

        public ProductController(IProductManager productManager, IMapper mapper)
        {
            _productManager = productManager;
            _mapper = mapper;
        }

        // GET: api/<ProductController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductViewModel>>> Get()
        {
            IEnumerable<ProductViewModel> products = _mapper.Map<IEnumerable<ProductViewModel>>(await _productManager.Get());
            return Ok(products);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductViewModel>> Get(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Product Id can not found! Try again." });

            ProductViewModel productInfo = _mapper.Map<ProductViewModel>(await _productManager.Get(id));

            if (productInfo == null)
                return NotFound(new { ErrorMessage = "Product can not found! Try again." });

            return Ok(productInfo);
        }

        // POST api/<ProductController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ProductViewModel>> Post([FromBody] ProductUpsertModel product)
        {
            if (ModelState.IsValid)
            {
                Product createProductInfo = _mapper.Map<Product>(product);
                bool isCreated = await _productManager.Create(createProductInfo);

                if (!isCreated)
                    return BadRequest(new { ErrorMessage = "Product can not be created!" });

                ProductViewModel createdProductInfo = _mapper.Map<ProductViewModel>(createProductInfo);
                return Ok(createdProductInfo);
            }

            return BadRequest(new { ErrorMessage = "Product form can not fulfill properly!" });
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult<ProductViewModel>> Put(int? id, [FromBody] ProductUpsertModel product)
        {
            if (ModelState.IsValid)
            {
                if (id != product.Id)
                    return NotFound(new { ErrorMessage = "Product Id can not match!" });

                Product updateProductInfo = _mapper.Map<Product>(product);
                bool isUpdate = await _productManager.Update(updateProductInfo);

                if (!isUpdate)
                    return BadRequest(new { ErrorMessage = "Product can not be updated!" });

                ProductViewModel updatedProductInfo = _mapper.Map<ProductViewModel>(updateProductInfo);
                return Ok(updatedProductInfo);
            }

            return BadRequest(new { ErrorMessage = "Product form can not fulfill properly!" });
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ProductViewModel>> Delete(int? id)
        {
            if (id == null)
                return NotFound(new { ErrorMessage = "Product Id can not found!" });

            Product existProductInfo = await _productManager.Get(id);

            if (existProductInfo == null)
                return NotFound(new { ErrorMessage = "Product can not found!" });

            bool isDeleted = await _productManager.Delete(existProductInfo);

            if (!isDeleted)
                return BadRequest(new { ErrorMessage = "Product can not deleted!" });

            ProductViewModel deletedProductInfo = _mapper.Map<ProductViewModel>(existProductInfo);
            return Ok(deletedProductInfo);
        }

        // GET api/<ProductController>/name
        [HttpGet("{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> ExistProductName(string name)
        {
            if (name == "" || name == null)
                return Ok(false);

            bool result = await _productManager.IsExistProductName(name);
            return Ok(result);
        }
    }
}
