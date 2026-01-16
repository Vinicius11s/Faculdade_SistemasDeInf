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
    public class ClienteRepositorio : IClienteRepositorio
    {

        private EmpresaContexto contexto;

        public ClienteRepositorio(EmpresaContexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Cliente> AddAsync(Cliente cliente)
        {
            await this.contexto.Clientes.AddAsync(cliente);
            await this.contexto.SaveChangesAsync();
            return cliente;   

        }

        //public async Task salveChanges() {

        //    await this.contexto.SaveChangesAsync();
        //}

        public async Task<IEnumerable<Cliente>> GetAllAsync(Expression<Func<Cliente, bool>> expression)
        {
           return await this.contexto.Clientes
                                        .Where(expression)
                                        .OrderBy(p=>p.Nome)
                                        .ToListAsync(); 
        }

        public async Task<Cliente?> GetAsync(int id)
        {
            return await this.contexto.Clientes.FindAsync(id);
        }

        public async Task RemoveAsync(Cliente Cliente)
        {
            this.contexto.Clientes.Remove(Cliente);
            await this.contexto.SaveChangesAsync();

        }

        public async Task UpdateAsync(Cliente Cliente)
        {
            this.contexto.Entry(Cliente).State 
                = EntityState.Modified;
            await this.contexto.SaveChangesAsync();
        }
    }
}
