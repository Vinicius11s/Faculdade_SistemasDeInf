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
    public interface IPedidoService
    {
        Task<PedidoDTO> AddAsync(PedidoDTO pedido);
        Task RemoveAsync(int id);
        Task<PedidoDTO?> GetAsync(int id);
        Task<IEnumerable<PedidoDTO>>GetAllAsync(Expression<Func<Pedido, bool>>expression);
        Task UpdateAsync(PedidoDTO pedido);
        Task RemoveAllAsync();
    }
}
