using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades
{
    public class ProdutoPedido
    {
        public int Id { get; set; }

        public int IdProduto { get; set; }
        public virtual Produto? Produto{ get; set; }

        public int IdPedido { get; set; }
        public virtual Pedido? Pedido { get; set; }

        public decimal Quantidade{ get; set; }
        public decimal ValorUnitario { get; set; }

    }
}
