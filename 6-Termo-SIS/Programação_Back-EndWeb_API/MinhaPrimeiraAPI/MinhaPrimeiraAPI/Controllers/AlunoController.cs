using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinhaPrimeiraAPI.Data;
using MinhaPrimeiraAPI.Model;

namespace MinhaPrimeiraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private EscolaContext _context;

        public AlunoController(EscolaContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AlunoModel>>> listar() {
            return await _context.Aluno.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<AlunoModel>> inserir(AlunoModel model) {
            await _context.Aluno.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        [HttpPut]
        public async Task<ActionResult> alterar(AlunoModel model) {
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> excluir(int id) {  

            var obj = await _context.Aluno.FindAsync(id);
            if (obj == null)
                return NotFound();
            else
            {
                _context.Aluno.Remove(obj);
                await _context.SaveChangesAsync();
                return NoContent();
            }   
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlunoModel>> recuperar(int id)
        {
            return await _context.Aluno.FindAsync(id);
        }

        [HttpGet("buscarNome{RA}")]
        public async Task<ActionResult<AlunoModel>> recuperarRA(string RA)
        {
            return await _context.Aluno.Where(o => o.RA == RA).FirstAsync();
        }
    }
}
