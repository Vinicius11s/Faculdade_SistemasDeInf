using Azure.Core;
using Dominio.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Interface.Service;
using System.Linq;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SegurancaController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IUsuarioService _usuarioService;

        public SegurancaController(IConfiguration Configuration, IUsuarioService usuarioService)
        {
            _config = Configuration;
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UsuarioDTO loginDetalhes)
        {
            bool resultado = await ValidarUsuario(loginDetalhes);
            if (resultado)
            {
                var tokenString = GerarTokenJWT();
                return Ok(new
                {
                    access_token = tokenString,
                    token_type = "Bearer",
                    expires_in = 60 * 60 // 60 min
                });
            }
            else
            {
                return Unauthorized(new { 
                    message = "Credenciais inválidas",
                    error = "INVALID_CREDENTIALS" 
                });
            }
        }
        private string GerarTokenJWT()
        {

            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? ""));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, "1"),
        new Claim(JwtRegisteredClaimNames.UniqueName, "ana"),
        new Claim(ClaimTypes.Role, "Admin")
    };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private async Task<bool> ValidarUsuario(UsuarioDTO loginDetalhes)
        {

            var usuarios = await _usuarioService.GetAllAsync(u => u.Login == loginDetalhes.Login && u.Senha == loginDetalhes.Senha);
            return usuarios.Any();
        }
    }
}
