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
    public class UsuarioService : IUsuarioService
    {

        private IUsuarioRepositorio repositorio;

        private IMapper mapper;

        public UsuarioService(IUsuarioRepositorio repositorio,
            IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }

        public async Task<UsuarioDTO> AddAsync(UsuarioDTO usuario)
        {
            var entidade = mapper.Map<Usuario>(usuario);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<UsuarioDTO>(usuario);
        }
        public async Task<IEnumerable<UsuarioDTO>> GetAllAsync(Expression<Func<Usuario, bool>> expression)
        {
            var listaUsuario = await this.repositorio.GetAllAsync(expression);
            return mapper.Map<IEnumerable<UsuarioDTO>>(listaUsuario);
        }
        public async Task<UsuarioDTO?> GetAsync(int id)
        {
            var pedido = await this.repositorio.GetAsync(id);
            return mapper.Map<UsuarioDTO?>(pedido);
        }
        public async Task RemoveAsync(int id)
        {
            var usuario = await this.repositorio.GetAsync(id);
            if (usuario != null)
                await this.repositorio.RemoveAsync(usuario);
        }
        public async Task UpdateAsync(UsuarioDTO usuario)
        {
            var usu = mapper.Map<Usuario>(usuario);
            await this.repositorio.UpdateAsync(usu);
        }
    }
}
