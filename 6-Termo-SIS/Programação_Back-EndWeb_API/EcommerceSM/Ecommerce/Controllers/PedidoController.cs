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
    public class PedidoController : ControllerBase
    {
        private IPedidoService service;

        public PedidoController(IPedidoService service)
        {
            this.service = service;
        }
        //
        [HttpPost]
        public async Task<ActionResult<PedidoDTO>> addAsync(PedidoDTO pedidoDTO)
        {
            try
            {
                Console.WriteLine($"Recebendo pedido: {System.Text.Json.JsonSerializer.Serialize(pedidoDTO)}");
                var dto = await this.service.AddAsync(pedidoDTO);
                Console.WriteLine($"Pedido salvo com sucesso: {System.Text.Json.JsonSerializer.Serialize(dto)}");
                return Ok(dto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao salvar pedido: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> getAllAsync()
        {
            try
            {
                Console.WriteLine("Buscando todos os pedidos...");
                var lista = await this.service.GetAllAsync(p => true);
                Console.WriteLine($"Encontrados {lista?.Count() ?? 0} pedidos");
                return Ok(lista);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar pedidos: {ex.Message}");
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
        //
        [HttpGet("/filtrar-pedido")]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetDataAsync([FromQuery] DateTime data)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Data == data);
            return Ok(lista);
        }
        //
        [HttpDelete("limpar-todos")]
        public async Task<ActionResult> limparTodosAsync()
        {
            try
            {
                Console.WriteLine("Limpando todos os pedidos...");
                await this.service.RemoveAllAsync();
                Console.WriteLine("Todos os pedidos foram removidos com sucesso");
                return Ok(new { message = "Todos os pedidos foram removidos com sucesso" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao limpar pedidos: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
        //
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PedidoDTO>> getAsync(int id)
        {
            var pedido = await this.service.GetAsync(id);
            if (pedido == null)
                return NotFound(); //não encontrou
            else
                return Ok(pedido);
        }
        //
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> deleteAsync(int id)
        {
            await this.service.RemoveAsync(id);
            return NoContent(); //sem retorno
        }
        //
        [HttpPut]
        public async Task<ActionResult> updateAsync(PedidoDTO pedido)
        {
            try
            {
                Console.WriteLine($"Atualizando pedido: {System.Text.Json.JsonSerializer.Serialize(pedido)}");
                await this.service.UpdateAsync(pedido);
                Console.WriteLine($"Pedido {pedido.Id} atualizado com sucesso");
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao atualizar pedido: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
    }
}
