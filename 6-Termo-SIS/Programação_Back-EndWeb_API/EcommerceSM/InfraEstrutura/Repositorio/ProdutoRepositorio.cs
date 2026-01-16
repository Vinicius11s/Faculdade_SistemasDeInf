using Dominio.Entidades;
using InfraEstrutura.Data;
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
    public class ProdutoRepositorio : IProdutoRepositorio
    {
        private EmpresaContexto contexto;

        public ProdutoRepositorio(EmpresaContexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Produto> AddAsync(Produto produto)
        {
            await this.contexto.Produtos.AddAsync(produto);
            await this.contexto.SaveChangesAsync();
            return produto;
        }
        public async Task<IEnumerable<Produto>> GetAllAsync(Expression<Func<Produto, bool>> expression)
        {
            return await this.contexto.Produtos.Where(expression)
                                              .OrderBy(i => i.Descricao)
                                              .ToListAsync();
        }
        public async Task<Produto?> GetAsync(int id)
        {
            return await this.contexto.Produtos.Where(p => p.Id == id)
                                              .OrderBy(p => p.Descricao)
                                              .FirstOrDefaultAsync();
        }
        public async Task RemoveAsync(Produto produto)
        {
            this.contexto.Produtos.Remove(produto);
            await this.contexto.SaveChangesAsync();
        }
        public async Task UpdateAsync(Produto produto)
        {
            this.contexto.Entry(produto).State = EntityState.Modified;
            await this.contexto.SaveChangesAsync();
        }
    }
}
