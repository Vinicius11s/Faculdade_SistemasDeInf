using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string URLImagem { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string UnidadeCompra { get; set; } = string.Empty;
        public decimal Estoque { get; set; }

        public int? IdCategoria { get; set; }
        public virtual Categoria? Categoria { get; set; }

        public virtual List<ProdutoPedido> ProdutoPedidos { get; set; } = new List<ProdutoPedido>();
    }
}
