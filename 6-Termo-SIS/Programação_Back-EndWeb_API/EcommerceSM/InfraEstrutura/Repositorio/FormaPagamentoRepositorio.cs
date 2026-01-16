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
    public class FormaPagamentoRepositorio : IFormaPagamentoRepositorio
    {
        private EmpresaContexto contexto;
        public FormaPagamentoRepositorio(EmpresaContexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<FormaPagamento> AddAsync(FormaPagamento formaPagamento)
        {
           
            await this.contexto.AddAsync(formaPagamento);
            await this.contexto.SaveChangesAsync();
            return formaPagamento;
        }
        public async Task<IEnumerable<FormaPagamento>> GetAllAsync(Expression<Func<FormaPagamento, bool>> expression)
        {
            return await this.contexto.FormaPagamentos.Where(expression).OrderBy(f => f.Descricao).ToListAsync();
        }
        public async Task<FormaPagamento?> GetAsync(int id)
        {
            return await this.contexto.FormaPagamentos.FindAsync(id);
        }
        public async Task RemoveAsync(FormaPagamento formaPagamento)
        {
            this.contexto.FormaPagamentos.Remove(formaPagamento);
            await this.contexto.SaveChangesAsync();
        }
        public async Task UpdateAsync(FormaPagamento formaPagamento)
        {
            this.contexto.Entry(formaPagamento).State = EntityState.Modified;
            await this.contexto.SaveChangesAsync();
        }
    }
}
