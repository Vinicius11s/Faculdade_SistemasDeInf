using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.DTOs
{
    public class PedidoDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal ValorTotal { get; set; }

        public int IdCliente { get; set; }
        public ClienteDTO? Cliente { get; set; }
        
        public int IdFormaPagamento { get; set; }
        public FormaPagamentoDTO? FormaPagamento { get; set; }

        public List<ProdutoPedidoDTO> ProdutoPedidos { get; set; }
            = new List<ProdutoPedidoDTO>();
    }
}
