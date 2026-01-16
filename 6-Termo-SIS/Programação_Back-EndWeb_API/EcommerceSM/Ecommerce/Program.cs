using Dominio.DTOs;
using Ecommerce.Mapping;
using Ecommerce.Validation;
using FluentValidation;
using InfraEstrutura.Data;
using InfraEstrutura.Repositorio;
using Interface.Repositorio;
using Interface.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Service;
using System.Globalization;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Minha API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Insira 'Bearer' + espa�o + token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});



//configurar JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey
                      (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? ""))
                    };
                });
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

//configurar o contexto
builder.Services.AddDbContext<EmpresaContexto>
    (p => p.UseSqlServer(
        builder.Configuration
        .GetConnectionString("Default")));

//configurar o mapping
builder.Services.AddAutoMapper(
    p => p.AddProfile<MappingProfile>());

//configurar inje��o de dependencia
builder.Services.AddScoped<ICategoriaRepositorio,CategoriaRepositorio>();
builder.Services.AddScoped<ICategoriaService,CategoriaService>();
builder.Services.AddScoped<IValidator<CategoriaDTO>, CategoriaValidation>();

builder.Services.AddScoped<IClienteRepositorio, ClienteRepositorio>();
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IValidator<ClienteDTO>, ClienteValidation>();

builder.Services.AddScoped<IFormaPagamentoRepositorio, FormaPagamentoRepositorio>();
builder.Services.AddScoped<IFormaPagamentoService, FormaPagamentoService>();
builder.Services.AddScoped<IValidator<FormaPagamentoDTO>, FormaPagamentoValidation>();

builder.Services.AddScoped<IPedidoRepositorio, PedidoRepositorio>();
builder.Services.AddScoped<IPedidoService, PedidoService>();
builder.Services.AddScoped<IValidator<PedidoDTO>, PedidoValidation>();

builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio >();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IValidator<ProdutoDTO>, ProdutoValidation>();

builder.Services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IValidator<UsuarioDTO>, UsuarioValidation>();
//
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("PermitirFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
