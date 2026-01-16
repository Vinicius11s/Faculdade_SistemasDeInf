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
    public class CategoriaService : ICategoriaService
    {
        private ICategoriaRepositorio repositorio;
        private IMapper mapper;

        public CategoriaService(ICategoriaRepositorio repositorio,
            IMapper mapper)
        {
            this.repositorio = repositorio;
            this.mapper = mapper;
        }


        public async Task<CategoriaDTO> AddAsync(CategoriaDTO categoria)
        {
            var entidade = mapper.Map<Categoria>(categoria);
            entidade = await this.repositorio.AddAsync(entidade);
            return mapper.Map<CategoriaDTO>(entidade);

        }
        public async Task<IEnumerable<CategoriaDTO>> GetAllAsync(Expression<Func<Categoria, bool>> expression)
        {
            var listaCat =
                await this.repositorio.GetAllAsync(expression);
            return mapper.Map<IEnumerable<CategoriaDTO>>(listaCat);
        }
        public async Task<CategoriaDTO?> GetAsync(int id)
        {
            var cat = await this.repositorio.GetAsync(id);
            return mapper.Map<CategoriaDTO>(cat);
        }
        public async Task RemoveAsync(int id)
        {
            var cat = await this.repositorio.GetAsync(id);
            if(cat!=null)
             await this.repositorio.RemoveAsync(cat);
        }
        public async Task UpdateAsync(CategoriaDTO categoria)
        {
            var cat = mapper.Map<Categoria>(categoria);
            await this.repositorio.UpdateAsync(cat);
        }
    }
}
