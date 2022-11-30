using System.Security.Claims;
using APIInpost.Entities;
using APIInpost.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IParcelService, ParcelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IParcelLockerService, ParcelLockerService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddDbContext<InpostDbContext>(opt => {
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

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
      builder.Services.AddControllers();

Thread.Sleep(10_000);
var provider = builder.Services.BuildServiceProvider();
using(var scope = provider.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<InpostDbContext>();
    db.Database.Migrate();
}
    
var app = builder.Build();




app.UseRouting();
app.UseCors(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
