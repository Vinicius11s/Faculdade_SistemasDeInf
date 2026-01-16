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
    public interface ICategoriaService
    {
        Task<CategoriaDTO> AddAsync(CategoriaDTO categoria);
        Task RemoveAsync(int id);
        Task<CategoriaDTO?> GetAsync(int id);
        Task<IEnumerable<CategoriaDTO>>GetAllAsync(Expression<Func<Categoria, bool>>expression);
        Task UpdateAsync(CategoriaDTO categoria);
    }
}
