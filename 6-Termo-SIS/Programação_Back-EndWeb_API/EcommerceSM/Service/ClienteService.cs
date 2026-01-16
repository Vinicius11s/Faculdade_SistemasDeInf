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
    public class ClienteService : IClienteService
    {
        private IClienteRepositorio repositorio;
        private IMapper mapper;

        public ClienteService(IClienteRepositorio repositorio,
            IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }

        public async Task<ClienteDTO> AddAsync(ClienteDTO cliente)
        {
            var entidade = mapper.Map<Cliente>(cliente);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<ClienteDTO>(entidade);
        }
        public async Task<IEnumerable<ClienteDTO>> GetAllAsync(Expression<Func<Cliente, bool>> expression)
        {
            var listaCli =
                await this.repositorio.GetAllAsync(expression);
            return mapper.Map<IEnumerable<ClienteDTO>>(listaCli);
        }
        public async Task<ClienteDTO?> GetAsync(int id)
        {
            var cli = await this.repositorio.GetAsync(id);
            return mapper.Map<ClienteDTO?>(cli);
        }
        public async Task RemoveAsync(int id)
        {
            var cli = await this.repositorio.GetAsync(id);
            if(cli != null)
                await this.repositorio.RemoveAsync(cli);            
        }
        public async Task UpdateAsync(ClienteDTO cliente)
        {
            var cli = mapper.Map<Cliente>(cliente);
            await this.repositorio.UpdateAsync(cli);
        }
    }
}
