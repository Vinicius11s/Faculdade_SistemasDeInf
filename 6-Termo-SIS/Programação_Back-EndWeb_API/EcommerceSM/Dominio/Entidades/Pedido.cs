using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades
{
    public class Pedido
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = String.Empty;
        public DateTime Data { get; set; }
        public string Status { get; set; } = String.Empty;
        public decimal ValorTotal { get; set; }

        public int IdCliente { get; set; }
        public virtual Cliente? Cliente { get; set; }

        public int IdFormaPagamento { get; set; }
        public virtual FormaPagamento? FormaPagamento { get; set; }

        public virtual List<ProdutoPedido> ProdutoPedidos { get; set; }
            = new List<ProdutoPedido>();
    }
}
