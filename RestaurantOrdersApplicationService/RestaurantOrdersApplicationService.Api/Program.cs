using Microsoft.OpenApi.Models;
using RestaurantOrdersApplicationService.Manager;
using RestaurantOrdersApplicationService.Manager.Contract;
using RestaurantOrdersApplicationService.Repository;
using RestaurantOrdersApplicationService.Repository.Contract;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "RestaurantOrdersApplicationService.Api", Version = "v1" });
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<ICustomerManager, CustomerManager>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IPaymentGetwayManager, PaymentGetwayManager>();
builder.Services.AddScoped<IPaymentGetwayRepository, PaymentGetwayRepository>();
builder.Services.AddScoped<IProductManager, ProductManager>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderManager, OrderManager>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailsManager, OrderDetailsManager>();
builder.Services.AddScoped<IOrderDetailsRepository, OrderDetailsRepository>();

builder.Services.AddCors(option =>
{
    option.AddPolicy("AllowOrigin", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RestaurantOrdersApplicationService.Api v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowOrigin");

app.Run();
