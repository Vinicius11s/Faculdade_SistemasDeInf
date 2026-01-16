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
    public class PedidoService : IPedidoService
    {
        private IPedidoRepositorio repositorio;
        private IMapper mapper;

        public PedidoService(IPedidoRepositorio repositorio,
            IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }

        public async Task<PedidoDTO> AddAsync(PedidoDTO pedido)
        {
            var entidade = mapper.Map<Pedido>(pedido);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<PedidoDTO>(entidade);
        }
        public async Task<IEnumerable<PedidoDTO>> GetAllAsync(Expression<Func<Pedido, bool>> expression)
        {
            try
            {
                Console.WriteLine("PedidoService - Buscando pedidos...");
                var listaPedido = await this.repositorio.GetAllAsync(expression);
                Console.WriteLine($"PedidoService - Encontrados {listaPedido?.Count() ?? 0} pedidos");
                var resultado = mapper.Map<IEnumerable<PedidoDTO>>(listaPedido);
                Console.WriteLine($"PedidoService - Mapeados {resultado?.Count() ?? 0} DTOs");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"PedidoService - Erro: {ex.Message}");
                throw;
            }
        }
        public async Task<PedidoDTO?> GetAsync(int id)
        {
            var pedido = await this.repositorio.GetAsync(id);
            return mapper.Map<PedidoDTO?>(pedido);
        }
        public async Task RemoveAsync(int id)
        {
            var pedido = await this.repositorio.GetAsync(id);
            if(pedido != null)
                await this.repositorio.RemoveAsync(pedido);
        }
        public async Task UpdateAsync(PedidoDTO pedido)
        {
            var ped = mapper.Map<Pedido>(pedido);
            await this.repositorio.UpdateAsync(ped);
        }

        public async Task RemoveAllAsync()
        {
            await this.repositorio.RemoveAllAsync();
        }
    }
}
