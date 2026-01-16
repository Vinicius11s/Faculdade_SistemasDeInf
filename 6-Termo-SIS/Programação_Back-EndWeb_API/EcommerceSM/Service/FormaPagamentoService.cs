using AutoMapper;
using Dominio.DTOs;
using Dominio.Entidades;
using Interface.Repositorio;
using Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class FormaPagamentoService : IFormaPagamentoService
    {

        private IFormaPagamentoRepositorio repositorio;

        private IMapper mapper;

        public FormaPagamentoService(IFormaPagamentoRepositorio repositorio,
            IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }

        public async Task<FormaPagamentoDTO> AddAsync(FormaPagamentoDTO formaPagamento)
        {
            var entidade = mapper.Map<FormaPagamento>(formaPagamento);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<FormaPagamentoDTO>(entidade);
        }
        public async Task<IEnumerable<FormaPagamentoDTO>> GetAllAsync(Expression<Func<FormaPagamento, bool>> expression)
        {
            var listaFormas = await this.repositorio.GetAllAsync(expression);
            return mapper.Map<IEnumerable<FormaPagamentoDTO>>(listaFormas);
        }
        public async Task<FormaPagamentoDTO?> GetAsync(int id)
        {
            var forma = await this.repositorio.GetAsync(id);
            return mapper.Map<FormaPagamentoDTO>(forma);
        }
        public async Task RemoveAsync(int id)
        {
            var forma = await this.repositorio.GetAsync(id);
            if (forma != null)
                await this.repositorio.RemoveAsync(forma);          
        }
        public async Task UpdateAsync(FormaPagamentoDTO formaPagamento)
        {
            var forma = mapper.Map<FormaPagamento>(formaPagamento);
            await this.repositorio.UpdateAsync(forma);
            
        }
    }
}
