using Dominio.Entidades;
using InfraEstrutura.Data;
using Interface;
using Interface.Repositorio;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InfraEstrutura.Repositorio
{
    public class PedidoRepositorio : IPedidoRepositorio
    {

        private EmpresaContexto contexto;

        public PedidoRepositorio(EmpresaContexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Pedido> AddAsync(Pedido pedido)
        {
            await this.contexto.Pedidos.AddAsync(pedido);
            await this.contexto.SaveChangesAsync();
            return pedido;
        }
        public async Task<IEnumerable<Pedido>> GetAllAsync(Expression<Func<Pedido, bool>> expression)
        {
            try
            {
                Console.WriteLine("PedidoRepositorio - Buscando pedidos...");
                var pedidos = await this.contexto.Pedidos.Where(expression)
                                                          .Include(i => i.Cliente)
                                                          .Include(i => i.FormaPagamento)
                                                          .Include(i => i.ProdutoPedidos)
                                                            .ThenInclude(pp => pp.Produto)
                                                          .OrderBy(i => i.Descricao)
                                                          .ToListAsync();
                Console.WriteLine($"PedidoRepositorio - Encontrados {pedidos.Count} pedidos");
                return pedidos;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"PedidoRepositorio - Erro: {ex.Message}");
                throw;
            }
        }
        public async Task<Pedido?> GetAsync(int id)
        {
            return await this.contexto.Pedidos.Where(p => p.Id == id)
                                              .Include(p => p.Cliente)
                                              .Include(p => p.FormaPagamento)
                                              .Include(p => p.ProdutoPedidos)
                                                .ThenInclude(pp => pp.Produto)
                                              .OrderBy(p => p.Descricao)
                                              .FirstOrDefaultAsync();
        }
        public async Task RemoveAsync(Pedido pedido)
        {
            this.contexto.Pedidos.Remove(pedido);
            await this.contexto.SaveChangesAsync();
        }
        public async Task UpdateAsync(Pedido pedido)
        {
            try
            {
                Console.WriteLine($"PedidoRepositorio - Atualizando pedido ID: {pedido.Id}");
                
                // Verificar se o pedido existe no banco
                var pedidoExistente = await this.contexto.Pedidos.FindAsync(pedido.Id);
                if (pedidoExistente == null)
                {
                    Console.WriteLine($"PedidoRepositorio - Pedido ID {pedido.Id} não encontrado no banco");
                    throw new InvalidOperationException($"Pedido com ID {pedido.Id} não encontrado");
                }
                
                // Atualizar as propriedades
                pedidoExistente.Descricao = pedido.Descricao;
                pedidoExistente.Data = pedido.Data;
                pedidoExistente.Status = pedido.Status;
                pedidoExistente.ValorTotal = pedido.ValorTotal;
                pedidoExistente.IdCliente = pedido.IdCliente;
                pedidoExistente.IdFormaPagamento = pedido.IdFormaPagamento;
                
                await this.contexto.SaveChangesAsync();
                Console.WriteLine($"PedidoRepositorio - Pedido ID {pedido.Id} atualizado com sucesso");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"PedidoRepositorio - Erro ao atualizar pedido: {ex.Message}");
                throw;
            }
        }

        public async Task RemoveAllAsync()
        {
            try
            {
                Console.WriteLine("PedidoRepositorio - Removendo todos os pedidos...");
                
                // Usar SQL direto para garantir que funcione mesmo com relacionamentos
                // Primeiro, remover todos os ProdutoPedidos
                var produtoPedidosRemovidos = await this.contexto.Database.ExecuteSqlRawAsync(
                    "DELETE FROM [ProdutoPedidos]");
                Console.WriteLine($"PedidoRepositorio - {produtoPedidosRemovidos} ProdutoPedidos removidos via SQL");
                
                // Depois, remover todos os Pedidos
                var pedidosRemovidos = await this.contexto.Database.ExecuteSqlRawAsync(
                    "DELETE FROM [Pedidos]");
                Console.WriteLine($"PedidoRepositorio - {pedidosRemovidos} pedidos removidos via SQL");
                
                Console.WriteLine("PedidoRepositorio - Todos os pedidos foram removidos com sucesso");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"PedidoRepositorio - Erro ao remover todos os pedidos: {ex.Message}");
                Console.WriteLine($"PedidoRepositorio - Stack trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"PedidoRepositorio - Inner exception: {ex.InnerException.Message}");
                }
                
                // Tentar método alternativo se o SQL direto falhar
                try
                {
                    Console.WriteLine("PedidoRepositorio - Tentando método alternativo...");
                    
                    // Primeiro, remover todos os ProdutoPedidos
                    var todosProdutoPedidos = await this.contexto.ProdutoPedidos.ToListAsync();
                    if (todosProdutoPedidos.Any())
                    {
                        this.contexto.ProdutoPedidos.RemoveRange(todosProdutoPedidos);
                        await this.contexto.SaveChangesAsync();
                        Console.WriteLine($"PedidoRepositorio - {todosProdutoPedidos.Count} ProdutoPedidos removidos");
                    }
                    
                    // Depois, remover todos os Pedidos
                    var todosPedidos = await this.contexto.Pedidos.ToListAsync();
                    if (todosPedidos.Any())
                    {
                        this.contexto.Pedidos.RemoveRange(todosPedidos);
                        await this.contexto.SaveChangesAsync();
                        Console.WriteLine($"PedidoRepositorio - {todosPedidos.Count} pedidos removidos com sucesso");
                    }
                    else
                    {
                        Console.WriteLine("PedidoRepositorio - Nenhum pedido encontrado para remover");
                    }
                }
                catch (Exception ex2)
                {
                    Console.WriteLine($"PedidoRepositorio - Método alternativo também falhou: {ex2.Message}");
                    throw new Exception($"Falha ao remover pedidos. Erro original: {ex.Message}. Erro alternativo: {ex2.Message}", ex);
                }
            }
        }
    }
}
