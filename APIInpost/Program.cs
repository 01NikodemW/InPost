using System.Security.Claims;
using System.Text.Json;
using APIInpost;
using APIInpost.Entities;
using APIInpost.models;
using APIInpost.Services;
using Auth0.AspNetCore.Authentication;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IParcelService, ParcelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IParcelLockerService, ParcelLockerService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddDbContext<InpostDbContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// builder.Services.ConfigureSameSiteNoneCookies();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Auth0:Authority"];
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        NameClaimType = ClaimTypes.NameIdentifier
    };
});

      builder.Services.AddCors(options =>
      {
        options.AddDefaultPolicy(
            builder =>
            {
              builder.WithOrigins("http://localhost:4040")
                 .WithHeaders("Authorization");
            });
      });
      builder.Services.AddControllers();
    
var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseRouting();
app.UseCors(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
