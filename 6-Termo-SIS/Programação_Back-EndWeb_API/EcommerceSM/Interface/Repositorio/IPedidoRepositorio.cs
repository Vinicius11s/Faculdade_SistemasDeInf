using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface IPedidoRepositorio
    {
        Task<Pedido> AddAsync(Pedido pedido);
        Task RemoveAsync(Pedido pedido);
        Task<Pedido?> GetAsync(int id);
        Task<IEnumerable<Pedido>> GetAllAsync(Expression<Func<Pedido, bool>> expression);
        Task UpdateAsync(Pedido pedido);
        Task RemoveAllAsync();
    }
}
