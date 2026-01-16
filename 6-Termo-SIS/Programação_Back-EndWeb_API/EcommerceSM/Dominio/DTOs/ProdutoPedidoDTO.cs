using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dominio.DTOs
{
    public class ProdutoPedidoDTO
    {
        public int Id { get; set; }
        public int IdProduto { get; set; }
        public ProdutoDTO? Produto { get; set; }
        public decimal Quantidade { get; set; }
        public decimal ValorUnitario { get; set; }
    }
}
