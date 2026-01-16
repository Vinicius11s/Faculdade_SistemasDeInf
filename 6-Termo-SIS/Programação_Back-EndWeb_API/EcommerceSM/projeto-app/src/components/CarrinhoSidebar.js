import React from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';

const CarrinhoSidebar = () => {
  const {
    itens,
    total,
    quantidadeTotal,
    isOpen,
    fecharCarrinho,
    removerItem,
    atualizarQuantidade,
    limparCarrinho
  } = useCarrinho();

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const calcularSubtotal = (item) => {
    return item.valor * item.quantidade;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={fecharCarrinho}
      ></div>

      {/* Sidebar do carrinho */}
      <div 
        className="carrinho-sidebar position-fixed top-0 end-0 h-100 d-flex flex-column"
        style={{ 
          width: '400px', 
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Header do carrinho */}
        <div className="bg-toledo-primary text-white p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-shopping-cart me-2"></i>
            Carrinho ({quantidadeTotal})
          </h5>
          <button 
            className="btn btn-link text-white p-0"
            onClick={fecharCarrinho}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Lista de itens */}
        <div className="flex-grow-1 overflow-auto p-3">
          {itens.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <h6 className="text-muted">Seu carrinho está vazio</h6>
              <p className="text-muted small">Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <>
              {itens.map(item => (
                <div key={item.id} className="carrinho-item">
                  <div className="row align-items-center">
                    {/* Imagem do produto */}
                    <div className="col-3">
                      <img 
                        src={item.urlImagem || 'https://via.placeholder.com/80x80?text=Produto'} 
                        alt={item.nome}
                        className="img-fluid rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Informações do produto */}
                    <div className="col-6">
                      <h6 className="mb-1 text-truncate">{item.nome}</h6>
                      <p className="mb-1 text-muted small">{formatarPreco(item.valor)}</p>
                      
                      {/* Controles de quantidade */}
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="mx-2 fw-bold">{item.quantidade}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Preço e remover */}
                    <div className="col-3 text-end">
                      <p className="mb-1 fw-bold text-toledo-success">
                        {formatarPreco(calcularSubtotal(item))}
                      </p>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removerItem(item.id)}
                        title="Remover item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer do carrinho */}
        {itens.length > 0 && (
          <div className="border-top p-3 bg-light">
            {/* Resumo do pedido */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Total:</h6>
              <h5 className="mb-0 text-toledo-success">{formatarPreco(total)}</h5>
            </div>

            {/* Botões de ação */}
            <div className="d-grid gap-2">
              <button 
                className="btn btn-toledo-primary"
                onClick={() => {
                  // Aqui você pode implementar a navegação para checkout
                  console.log('Ir para checkout');
                }}
              >
                <i className="fas fa-credit-card me-2"></i>
                Finalizar Compra
              </button>
              
              <button 
                className="btn btn-toledo-outline"
                onClick={limparCarrinho}
              >
                <i className="fas fa-trash me-2"></i>
                Limpar Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarrinhoSidebar;

