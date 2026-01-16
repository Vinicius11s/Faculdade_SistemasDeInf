using Dominio.DTOs;
using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Service
{
    public interface IProdutoService
    {
        Task<ProdutoDTO> AddAsync(ProdutoDTO produto);
        Task RemoveAsync(int id);
        Task<ProdutoDTO?> GetAsync(int id);
        Task<IEnumerable<ProdutoDTO>>GetAllAsync(Expression<Func<Produto, bool>>expression);
        Task UpdateAsync(ProdutoDTO produto);
    }
}
