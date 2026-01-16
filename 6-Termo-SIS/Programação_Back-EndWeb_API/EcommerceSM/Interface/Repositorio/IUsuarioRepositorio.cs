using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Interface.Repositorio
{
    public interface IUsuarioRepositorio
    {
        Task<Usuario> AddAsync(Usuario usuario);
        Task RemoveAsync(Usuario usuario);
        Task<Usuario?> GetAsync(int id);
        Task<IEnumerable<Usuario>> GetAllAsync(Expression<Func<Usuario, bool>> expression);
        Task UpdateAsync(Usuario usuario);
    }
}
