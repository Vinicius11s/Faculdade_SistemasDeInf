using Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfraEstrutura.Data
{
    public class EmpresaContexto:DbContext
    {

        public EmpresaContexto(
            DbContextOptions<EmpresaContexto> opcoes)
            :base(opcoes) { 
        }
  
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<FormaPagamento> FormaPagamentos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ProdutoPedido> ProdutoPedidos { get; set; }
        public DbSet<Usuario> Usuarios  { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Categoria>(builder => {
                builder.Property(p => p.Descricao).IsRequired().HasMaxLength(100);
            });

            modelBuilder.Entity<Cliente>(builder => {
                builder.Property(p => p.Nome).IsRequired().HasMaxLength(100);
                builder.Property(p => p.CPF).IsRequired().HasMaxLength(14);
                builder.Property(p => p.Endereco).IsRequired().HasMaxLength(150);

            });
            modelBuilder.Entity<FormaPagamento>(builder => {
                builder.Property(p => p.Descricao).IsRequired().HasMaxLength(50);

            });
            modelBuilder.Entity<Pedido>(builder => {
                builder.Property(p => p.Data).IsRequired();
                builder.Property(p => p.Status).IsRequired().HasMaxLength(50);
                builder.Property(p => p.Descricao).HasMaxLength(200);
                builder.Property(p => p.ValorTotal).HasPrecision(18, 2).HasDefaultValue(0);

            });
            modelBuilder.Entity<Produto>(builder => {
                builder.Property(p => p.Nome).IsRequired().HasMaxLength(50);
                builder.Property(p => p.Descricao).IsRequired().HasMaxLength(150);
                builder.Property(p => p.URLImagem).HasMaxLength(500);
                builder.Property(p => p.Valor).HasPrecision(18, 2).HasDefaultValue(0);
                builder.Property(p => p.UnidadeCompra).HasMaxLength(10);
                builder.Property(p => p.Estoque).HasPrecision(18, 3).HasDefaultValue(0);
            });

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ProdutoPedido>(builder => {
                builder.Property(p => p.Quantidade).IsRequired().HasPrecision(18, 3);
                builder.Property(p => p.ValorUnitario).HasPrecision(18, 2).HasDefaultValue(0);
            });

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>(builder => {
                builder.Property(p => p.Login).IsRequired().HasMaxLength(50);
                builder.Property(p => p.Senha).IsRequired().HasMaxLength(50);
            });
            // Categoria 1:N Produto

            modelBuilder.Entity<Produto>()
               .HasOne(p => p.Categoria)
               .WithMany(c => c.Produtos)
               .HasForeignKey(p => p.IdCategoria)
               .OnDelete(DeleteBehavior.Restrict);


            // Cliente 1:N Pedido
            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.Cliente)
                .WithMany(c => c.Pedidos)
                .HasForeignKey(p => p.IdCliente)
                .OnDelete(DeleteBehavior.Restrict);

            // FormaPagamento 1:N Pedido
            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.FormaPagamento)
                .WithMany(f => f.Pedidos)
                .HasForeignKey(p => p.IdFormaPagamento)
                .OnDelete(DeleteBehavior.Restrict);

            // Pedido 1:N ItemDoPedido
            modelBuilder.Entity<ProdutoPedido>()
                .HasOne(i => i.Pedido)
                .WithMany(p => p.ProdutoPedidos)
                .HasForeignKey(i => i.IdPedido)
                .OnDelete(DeleteBehavior.Cascade);

            // Produto 1:N ProdutoPediddos
            modelBuilder.Entity<ProdutoPedido>()
                .HasOne(i => i.Produto)
                .WithMany(p => p.ProdutoPedidos)
                .HasForeignKey(i => i.IdProduto)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Login).HasMaxLength(50).IsRequired();


            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    Id = 1,
                    Login = "admin",
                    Senha = "123456"
                }
            );
        }
    }
}
