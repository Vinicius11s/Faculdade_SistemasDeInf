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
    public class ProdutoService : IProdutoService
    {
        private IProdutoRepositorio repositorio;
        private IMapper mapper;

        public ProdutoService(IProdutoRepositorio repositorio, IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }

        public async Task<ProdutoDTO> AddAsync(ProdutoDTO produto)
        {
            var entidade = mapper.Map<Produto>(produto);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<ProdutoDTO>(entidade);
        }
        public async Task<IEnumerable<ProdutoDTO>> GetAllAsync(Expression<Func<Produto, bool>> expression)
        {
            var listaProd = await this.repositorio.GetAllAsync(expression);
            return mapper.Map<IEnumerable<ProdutoDTO>>(listaProd);
        }
        public async Task<ProdutoDTO?> GetAsync(int id)
        {
            var pedido = await this.repositorio.GetAsync(id);
            return mapper.Map<ProdutoDTO?>(pedido);
        }
        public async Task RemoveAsync(int id)
        {
            var prod = await this.repositorio.GetAsync(id);
            if (prod != null)
                await this.repositorio.RemoveAsync(prod);
        }
        public async Task UpdateAsync(ProdutoDTO produto)
        {
            var prod = mapper.Map<Produto>(produto);
            await this.repositorio.UpdateAsync(prod);
        }
    }
}
