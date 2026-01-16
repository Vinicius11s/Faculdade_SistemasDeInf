using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface IFormaPagamentoRepositorio
    {
        Task<FormaPagamento> AddAsync(FormaPagamento formaPagamento);
        Task RemoveAsync(FormaPagamento formaPagamento);
        Task<FormaPagamento?> GetAsync(int id);
        Task<IEnumerable<FormaPagamento>>GetAllAsync(Expression<Func<FormaPagamento, bool>>expression);
        Task UpdateAsync(FormaPagamento formaPagamento);
    }
}
