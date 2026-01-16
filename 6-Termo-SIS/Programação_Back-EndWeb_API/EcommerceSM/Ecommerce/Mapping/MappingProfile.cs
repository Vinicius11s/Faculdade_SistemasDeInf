using AutoMapper;
using Dominio.DTOs;
using Dominio.Entidades;

namespace Ecommerce.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {
            CreateMap<Categoria, CategoriaDTO>()
                .ReverseMap();
            CreateMap<Cliente, ClienteDTO>()
                    .ReverseMap();
            CreateMap<FormaPagamento, FormaPagamentoDTO>()
                    .ReverseMap();
            CreateMap<Pedido, PedidoDTO>()
                    .ReverseMap();
            CreateMap<Produto, ProdutoDTO>()
                    .ReverseMap();
            CreateMap<ProdutoPedido, ProdutoPedidoDTO>()
                    .ReverseMap();
            CreateMap<Usuario, UsuarioDTO>()
                    .ReverseMap();        
        }
    }
}
