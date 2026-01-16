import React, { useState, useEffect } from 'react';
import ProdutoService from '../../services/produto.service';
import CategoriaService from '../../services/categoria.service';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import '../../styles/toledo-shop.css';
import './novo-pedido.css';

function NovoPedido() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  
  const produtoService = new ProdutoService();
  const categoriaService = new CategoriaService();
  const { adicionarItem, itens, quantidadeTotal, limparCarrinho } = useCarrinho();
  
  // Debug: verificar estado do carrinho
  console.log('NovoPedido - Estado do carrinho:', { itens, quantidadeTotal });
  
  // Debug: verificar localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('toledo-carrinho');
    console.log('NovoPedido - LocalStorage:', carrinhoSalvo);
  }, [itens, quantidadeTotal]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [produtosResponse, categoriasResponse] = await Promise.all([
        produtoService.listar(),
        categoriaService.listar()
      ]);
      
      setProdutos(produtosResponse.data || []);
      setCategorias(categoriasResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Dados mock para demonstração
      setProdutos([
        {
          id: 1,
          nome: "Arroz Branco 5kg",
          descricao: "Arroz branco tipo 1, pacote de 5kg",
          urlImagem: "https://via.placeholder.com/200x200?text=Arroz",
          valor: 12.90,
          unidadeCompra: "kg",
          estoque: 50,
          idCategoria: 1,
          categoria: { descricao: "Grãos e Cereais" }
        },
        {
          id: 2,
          nome: "Leite Integral 1L",
          descricao: "Leite integral pasteurizado",
          urlImagem: "https://via.placeholder.com/200x200?text=Leite",
          valor: 4.50,
          unidadeCompra: "litro",
          estoque: 30,
          idCategoria: 2,
          categoria: { descricao: "Laticínios" }
        },
        {
          id: 3,
          nome: "Pão Francês",
          descricao: "Pão francês fresco",
          urlImagem: "https://via.placeholder.com/200x200?text=Pão",
          valor: 9.50,
          unidadeCompra: "unidade",
          estoque: 20,
          idCategoria: 3,
          categoria: { descricao: "Padaria" }
        }
      ]);
      setCategorias([
        { id: 1, descricao: "Grãos e Cereais" },
        { id: 2, descricao: "Laticínios" },
        { id: 3, descricao: "Padaria" },
        { id: 4, descricao: "Frutas" },
        { id: 5, descricao: "Bebidas" },
        { id: 6, descricao: "Carnes" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const obterNomeCategoria = (produto) => {
    if (produto.categoria?.descricao) {
      return produto.categoria.descricao;
    }
    
    if (produto.idCategoria) {
      const categoria = categorias.find(cat => cat.id === produto.idCategoria);
      return categoria?.descricao || 'Sem categoria';
    }
    
    return 'Sem categoria';
  };

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const adicionarAoCarrinho = (produto) => {
    console.log('NovoPedido - Adicionando produto:', produto);
    adicionarItem(produto);
    console.log(`${produto.nome} adicionado ao carrinho!`);
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + (item.produto.valor * item.quantidade), 0);
  };

  const produtosFiltrados = produtos.filter(produto => {
    const matchNome = produto.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchCategoria = categoriaFiltro === '' || produto.idCategoria?.toString() === categoriaFiltro;
    return matchNome && matchCategoria;
  });

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-toledo-primary mb-1">
                <i className="fas fa-shopping-cart me-2"></i>
                Novo Pedido
              </h2>
              <p className="text-muted mb-0">Selecione os produtos para o pedido</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="h5 text-toledo-primary mb-0">
                  Total: {formatarPreco(calcularTotal())}
                </div>
                <small className="text-muted">
                  {quantidadeTotal} item(s) no carrinho
                </small>
              </div>
              <a 
                href="/finalizar-pedido" 
                className={`btn ${quantidadeTotal > 0 ? 'btn-toledo-primary' : 'btn-secondary'}`}
                style={{ pointerEvents: quantidadeTotal === 0 ? 'none' : 'auto' }}
              >
                <i className="fas fa-check me-2"></i>
                Finalizar Pedido
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produtos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id.toString()}>
                {categoria.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-toledo-outline w-100"
            onClick={() => {
              setFiltro('');
              setCategoriaFiltro('');
            }}
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="row">
        {produtosFiltrados.map(produto => (
          <div key={produto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card produto-card h-100">
              <div className="card-img-container">
                <img
                  src={produto.urlImagem || 'https://via.placeholder.com/200x200?text=Produto'}
                  className="card-img-top"
                  alt={produto.nome}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=Produto';
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {produto.descricao}
                </p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge badge-toledo">
                      {obterNomeCategoria(produto)}
                    </span>
                    <span className={`badge ${produto.estoque > 10 ? 'bg-success' : produto.estoque > 0 ? 'bg-warning' : 'bg-danger'}`}>
                      Estoque: {produto.estoque}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 preco-toledo mb-0">
                      {formatarPreco(produto.valor)}
                    </span>
                    <button
                      className="btn btn-toledo-primary btn-sm"
                      onClick={() => adicionarAoCarrinho(produto)}
                      disabled={produto.estoque === 0}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há produtos */}
      {produtosFiltrados.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-toledo-info text-center">
              <i className="fas fa-search fa-2x mb-3"></i>
              <h5>Nenhum produto encontrado</h5>
              <p>
                {filtro || categoriaFiltro
                  ? "Nenhum produto corresponde aos filtros aplicados"
                  : "Não há produtos disponíveis"
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Carrinho Flutuante */}
      {quantidadeTotal > 0 && (
        <div className="carrinho-flutuante">
          <div className="carrinho-content">
            <div className="carrinho-header">
              <h6 className="mb-0">
                <i className="fas fa-shopping-cart me-2"></i>
                Carrinho ({quantidadeTotal})
              </h6>
            </div>
            <div className="carrinho-body">
              {itens.map((item, index) => (
                <div key={index} className="carrinho-item">
                  <div className="item-info">
                    <strong className="small">{item.produto.nome}</strong>
                    <div className="small text-muted">
                      {formatarPreco(item.produto.valor)} x {item.quantidade}
                    </div>
                  </div>
                  <div className="item-total">
                    {formatarPreco(item.produto.valor * item.quantidade)}
                  </div>
                </div>
              ))}
            </div>
            <div className="carrinho-footer">
              <div className="total">
                <strong>Total: {formatarPreco(calcularTotal())}</strong>
              </div>
              <div className="d-grid gap-2">
                <a 
                  href="/finalizar-pedido" 
                  className="btn btn-toledo-primary btn-sm"
                >
                  Finalizar Pedido
                </a>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={limparCarrinho}
                >
                  <i className="fas fa-trash me-1"></i>
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NovoPedido;
