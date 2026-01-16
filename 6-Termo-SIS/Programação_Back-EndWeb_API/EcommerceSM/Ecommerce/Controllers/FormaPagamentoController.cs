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
    public class FormaPagamentoController : ControllerBase
    {
        private IFormaPagamentoService service;

        public FormaPagamentoController(IFormaPagamentoService service)
        {
            this.service = service;
        }

        //
        [HttpPost]
        public async Task<ActionResult<FormaPagamentoDTO>> addAsync(FormaPagamentoDTO formaPagamentoDTO)
        {
            var dto = await this.service.AddAsync(formaPagamentoDTO);
            return Ok(dto);
        }
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormaPagamentoDTO>>> getAllAsync()
        {
            var lista = await this.service.GetAllAsync(p => true);
            return Ok(lista);
        }
        
        [HttpGet("/filtrar-formaPagamento")]
        public async Task<ActionResult<IEnumerable<FormaPagamentoDTO>>> GetDescricaoAsync(string descricao)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Descricao.Contains(descricao));
            return Ok(lista);
        }
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<FormaPagamentoDTO>> getAsync(int id)
        {
            var forma = await this.service.GetAsync(id);
            if (forma == null)
                return NotFound(); //não encontrou
            else
                return Ok(forma);
        }
        //
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteAsync(int id)
        {
            try
            {
                await this.service.RemoveAsync(id);
                return NoContent(); //sem retorno
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
        //
        [HttpPut]
        public async Task<ActionResult> updateAsync(FormaPagamentoDTO forma)
        {
            try
            {
                await this.service.UpdateAsync(forma);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
    }
}
