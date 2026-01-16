using Dominio.Entidades;
using InfraEstrutura.Data;
using Interface;
using Interface.Repositorio;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InfraEstrutura.Repositorio
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {

        private EmpresaContexto contexto;

        public UsuarioRepositorio(EmpresaContexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Usuario> AddAsync(Usuario usuario)
        {
            await this.contexto.Usuarios.AddAsync(usuario);
            await this.contexto.SaveChangesAsync();
            return usuario;
        }
        public async Task<IEnumerable<Usuario>> GetAllAsync(Expression<Func<Usuario, bool>> expression)
        {
            return await this.contexto.Usuarios.Where(expression)
                                             .OrderBy(i => i.Login)
                                             .ToListAsync();
        }
        public async Task<Usuario?> GetAsync(int id)
        {
            return await this.contexto.Usuarios.Where(p => p.Id == id)
                                              .OrderBy(p => p.Login)
                                              .FirstOrDefaultAsync();
        }
        public async Task RemoveAsync(Usuario usuario)
        {
            this.contexto.Usuarios.Remove(usuario);
            await this.contexto.SaveChangesAsync();
        }
        public async Task UpdateAsync(Usuario usuario)
        {
            this.contexto.Entry(usuario).State = EntityState.Modified;
            await this.contexto.SaveChangesAsync();
        }
    }
}
