import React, { useState, useEffect } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';

function TesteCarrinho() {
  const { itens, quantidadeTotal, adicionarItem, limparCarrinho } = useCarrinho();
  
  const produtoTeste = {
    id: 999,
    nome: "Produto Teste",
    valor: 10.00,
    descricao: "Produto para teste"
  };

  const adicionarProdutoTeste = () => {
    console.log('Adicionando produto teste:', produtoTeste);
    adicionarItem(produtoTeste);
  };

  const verificarEstado = () => {
    console.log('Estado atual do carrinho:', { itens, quantidadeTotal });
    console.log('LocalStorage:', localStorage.getItem('toledo-carrinho'));
    
    // Testar se o contexto está funcionando
    const contextValue = { itens, quantidadeTotal, adicionarItem, limparCarrinho };
    console.log('Context value:', contextValue);
  };

  const testarPersistencia = () => {
    // Limpar tudo primeiro
    localStorage.removeItem('toledo-carrinho');
    limparCarrinho();
    
    // Adicionar produto
    setTimeout(() => {
      adicionarItem(produtoTeste);
      console.log('Produto adicionado');
      
      // Verificar após 1 segundo
      setTimeout(() => {
        console.log('Após 1 segundo:', { itens, quantidadeTotal });
        console.log('LocalStorage após 1s:', localStorage.getItem('toledo-carrinho'));
      }, 1000);
    }, 100);
  };

  return (
    <div className="container mt-4">
      <h2>Teste do Carrinho</h2>
      
      <div className="mb-3">
        <button onClick={adicionarProdutoTeste} className="btn btn-primary me-2">
          Adicionar Produto Teste
        </button>
        <button onClick={verificarEstado} className="btn btn-info me-2">
          Verificar Estado
        </button>
        <button onClick={testarPersistencia} className="btn btn-warning me-2">
          Testar Persistência
        </button>
        <button onClick={limparCarrinho} className="btn btn-danger">
          Limpar Carrinho
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Estado do Carrinho</h5>
        </div>
        <div className="card-body">
          <p><strong>Quantidade Total:</strong> {quantidadeTotal}</p>
          <p><strong>Itens:</strong> {itens.length}</p>
          
          {itens.length > 0 ? (
            <div>
              <h6>Produtos no Carrinho:</h6>
              <ul>
                {itens.map((item, index) => (
                  <li key={index}>
                    {item.produto.nome} - Qtd: {item.quantidade} - Valor: R$ {item.produto.valor}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted">Carrinho vazio</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TesteCarrinho;
