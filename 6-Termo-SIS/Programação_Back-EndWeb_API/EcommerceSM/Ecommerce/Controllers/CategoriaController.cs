using Azure.Core;
using Dominio.DTOs;
using Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private ICategoriaService service;

        public CategoriaController(ICategoriaService service)
        {
            this.service = service;
        }

        [HttpPost]
        public async Task<ActionResult<CategoriaDTO>>addAsync (CategoriaDTO categoriaDto)
        {
           var dto =  await  this.service.AddAsync(categoriaDto);
           return Ok (dto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDTO>>>getAllAsync()
        {
           var lista= await this.service.GetAllAsync(p=>true);
           return Ok (lista);  
        }


        [HttpGet("/filtrar-categoria")]
        public async Task<ActionResult<IEnumerable<CategoriaDTO>>> GetDescricaoAsync(string descricao)
        {
            var lista = await this.service.GetAllAsync(
                p => p.Descricao.Contains(descricao));
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaDTO>>getAsync(int id)
        {
            var cat = await this.service.GetAsync(id);
            if (cat == null)
                return NotFound(); //não encontrou
            else
                return Ok(cat);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteAsync(int id)
        {     
            await this.service.RemoveAsync (id);
            return NoContent(); //sem retorno
        }

        [HttpPut]
        public async Task<ActionResult>
            updateAsync(CategoriaDTO cat) { 
            await this.service.UpdateAsync(cat);
            return NoContent();
        
        }

    }
}
