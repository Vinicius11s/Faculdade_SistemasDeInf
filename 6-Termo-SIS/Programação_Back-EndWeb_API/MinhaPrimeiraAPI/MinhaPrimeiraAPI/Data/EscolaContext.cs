using Microsoft.EntityFrameworkCore;
using MinhaPrimeiraAPI.Model;

namespace MinhaPrimeiraAPI.Data
{
    public class EscolaContext : DbContext
    {
        public EscolaContext(DbContextOptions<EscolaContext> options)
            :base(options)
        {            
        
        }
        public DbSet<AlunoModel> Aluno { get; set; }
    }
}
