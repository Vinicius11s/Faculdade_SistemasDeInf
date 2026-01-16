using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface IProdutoRepositorio
    {
        Task<Produto> AddAsync(Produto produto);
        Task RemoveAsync(Produto produto);
        Task<Produto?> GetAsync(int id);
        Task<IEnumerable<Produto>> GetAllAsync(Expression<Func<Produto, bool>> expression);
        Task UpdateAsync(Produto produto);
    }
}
