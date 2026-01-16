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
    public interface IFormaPagamentoService
    {
        Task<FormaPagamentoDTO> AddAsync(FormaPagamentoDTO formaPagamento);
        Task RemoveAsync(int id);
        Task<FormaPagamentoDTO?> GetAsync(int id);
        Task<IEnumerable<FormaPagamentoDTO>>GetAllAsync(Expression<Func<FormaPagamento, bool>>expression);
        Task UpdateAsync(FormaPagamentoDTO formaPagamento);
    }
}
