using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface ICategoriaRepositorio
    {
        Task<Categoria> AddAsync(Categoria categoria);
        Task RemoveAsync(Categoria categoria);
        Task<Categoria?> GetAsync(int id);
        Task<IEnumerable<Categoria>>GetAllAsync(Expression<Func<Categoria, bool>>expression);
        Task UpdateAsync(Categoria categoria);
    }
}
