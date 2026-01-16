using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface IClienteRepositorio
    {
        Task<Cliente> AddAsync(Cliente cliente);
        Task RemoveAsync(Cliente cliente);
        Task<Cliente?> GetAsync(int id);
        Task<IEnumerable<Cliente>>GetAllAsync(Expression<Func<Cliente, bool>>expression);
        Task UpdateAsync(Cliente cliente);
    }
}
