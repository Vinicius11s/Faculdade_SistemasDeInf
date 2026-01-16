using Dominio.DTOs;
using Interface.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private IProdutoService service;

        public ProdutoController(IProdutoService service)
        {
            this.service = service;
        }

        //
        [HttpPost]
        public async Task<ActionResult<ProdutoDTO>> addAsync(ProdutoDTO produtoDTO)
        {
            var dto = await this.service.AddAsync(produtoDTO);
            return Ok(dto);
        }
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoDTO>>> getAllAsync()
        {
            var lista = await this.service.GetAllAsync(p => true);
            return Ok(lista);
        }
        //
        [HttpGet("/filtrar-produto")]
        public async Task<ActionResult<IEnumerable<ProdutoDTO>>> GetValorAsync([FromQuery] string descricao)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Valor == p.Valor);
            return Ok(lista);
        }
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoDTO>> getAsync(int id)
        {
            var produto = await this.service.GetAsync(id);
            if (produto == null)
                return NotFound(); //não encontrou
            else
                return Ok(produto);
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
        public async Task<ActionResult> updateAsync(ProdutoDTO produto)
        {
            await this.service.UpdateAsync(produto);
            return NoContent();

        }
    }
}
