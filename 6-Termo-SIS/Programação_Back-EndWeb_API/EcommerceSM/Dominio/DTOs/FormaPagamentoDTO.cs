using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dominio.DTOs
{
    public class FormaPagamentoDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;

        [JsonIgnore]
        public virtual List<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
