using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades
{
    public class FormaPagamento
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;

        public virtual List<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
