using Dominio.DTOs;
using Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClienteController : ControllerBase
    {
        private IClienteService service;

        public ClienteController(IClienteService service)
        {
            this.service = service;
        }
        
        //
        [HttpPost]
        public async Task<ActionResult<ClienteDTO>> addAsync(ClienteDTO clienteDTO)
        {
            var dto = await this.service.AddAsync(clienteDTO);
            return Ok(dto);
        }
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> getAllAsync()
        {
            var lista = await this.service.GetAllAsync(p => true);
            return Ok(lista);
        }
        //
        [HttpGet("filtrar-cliente")]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> GetNomeAsync(string nome)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Nome.Contains(nome));
            return Ok(lista);
        }
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteDTO>> getAsync(int id)
        {
            var cli = await this.service.GetAsync(id);
            if (cli == null)
                return NotFound(); //não encontrou
            else
                return Ok(cli);
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
        public async Task<ActionResult>updateAsync(ClienteDTO cli)
        {
            await this.service.UpdateAsync(cli);
            return NoContent();

        }
    }
}
