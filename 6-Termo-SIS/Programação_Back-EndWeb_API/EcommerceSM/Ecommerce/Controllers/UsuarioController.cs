using Dominio.DTOs;
using Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioService service;

        public UsuarioController(IUsuarioService service)
        {
            this.service = service;
        }
        //
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> addAsync(UsuarioDTO usuarioDTO)
        {
            var dto = await this.service.AddAsync(usuarioDTO);
            return Ok(dto);
        }
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> getAllAsync()
        {
            var lista = await this.service.GetAllAsync(p => true);
            return Ok(lista);
        }
        //
        [HttpGet("/filtrar-usuario")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetLoginAsync([FromQuery] string login)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Login.Contains(login));
            return Ok(lista);
        }
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> getAsync(int id)
        {
            var Usuario = await this.service.GetAsync(id);
            if (Usuario == null)
                return NotFound(); //não encontrou
            else
                return Ok(Usuario);
        }
        //
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteAsync(int id)
        {
            await this.service.RemoveAsync(id);
            return NoContent(); //sem retorno
        }
        //
        [HttpPut]
        public async Task<ActionResult> updateAsync(int id, UsuarioDTO usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest("O ID informado não confere com o objeto enviado.");
            }

            await this.service.UpdateAsync(usuario);
            return NoContent();

        }
    }
}
