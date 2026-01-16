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
    public interface IUsuarioService
    {
        Task<UsuarioDTO> AddAsync(UsuarioDTO usuario);
        Task RemoveAsync(int id);
        Task<UsuarioDTO?> GetAsync(int id);
        Task<IEnumerable<UsuarioDTO>>GetAllAsync(Expression<Func<Usuario, bool>>expression);
        Task UpdateAsync(UsuarioDTO usuario);
    }
}
