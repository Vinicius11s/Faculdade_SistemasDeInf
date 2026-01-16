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
    public interface IClienteService
    {
        Task<ClienteDTO> AddAsync(ClienteDTO cliente);
        Task RemoveAsync(int id);
        Task<ClienteDTO?> GetAsync(int id);
        Task<IEnumerable<ClienteDTO>>GetAllAsync(Expression<Func<Cliente, bool>>expression);
        Task UpdateAsync(ClienteDTO cliente);
    }
}
