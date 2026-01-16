using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dominio.DTOs
{
    public class ProdutoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string URLImagem { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string UnidadeCompra { get; set; } = string.Empty;
        public decimal Estoque { get; set; }

        // Agora pode enviar via JSON
        public int? IdCategoria { get; set; }

        [JsonIgnore] // evitar loop na serialização
        public virtual Categoria? Categoria { get; set; }

        [JsonIgnore]
        public virtual List<ProdutoPedido> produtospedido { get; set; } = new List<ProdutoPedido>();
    }

}

