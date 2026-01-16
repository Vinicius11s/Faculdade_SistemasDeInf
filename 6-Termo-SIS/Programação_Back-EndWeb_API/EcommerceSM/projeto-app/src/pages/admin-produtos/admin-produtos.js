import React, { useState, useEffect } from 'react';
import ProdutoService from '../../services/produto.service';
import CategoriaService from '../../services/categoria.service';
import '../../styles/toledo-shop.css';
import './admin-produtos.css';

function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  
  const produtoService = new ProdutoService();
  const categoriaService = new CategoriaService();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    urlImagem: '',
    valor: '',
    unidadeCompra: '',
    estoque: '',
    idCategoria: ''
  });

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
      
      console.log('Produtos da API:', produtosResponse.data);
      console.log('Categorias da API:', categoriasResponse.data);
      
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosProduto = {
        ...formData,
        valor: parseFloat(formData.valor),
        estoque: parseFloat(formData.estoque),
        idCategoria: parseInt(formData.idCategoria)
      };

      if (produtoEditando) {
        await produtoService.atualizar({ ...dadosProduto, id: produtoEditando.id });
      } else {
        await produtoService.salvar(dadosProduto);
      }

      setShowModal(false);
      setProdutoEditando(null);
      resetForm();
      // Recarregar dados para garantir que a categoria seja exibida corretamente
      await carregarDados();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  };

  const handleEdit = (produto) => {
    setProdutoEditando(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      urlImagem: produto.urlImagem,
      valor: produto.valor.toString(),
      unidadeCompra: produto.unidadeCompra,
      estoque: produto.estoque.toString(),
      idCategoria: produto.idCategoria?.toString() || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await produtoService.deletar(id);
        carregarDados();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      urlImagem: '',
      valor: '',
      unidadeCompra: '',
      estoque: '',
      idCategoria: ''
    });
  };

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    resetForm();
    setShowModal(true);
  };

  const produtosFiltrados = produtos.filter(produto => {
    const matchNome = produto.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchCategoria = categoriaFiltro === '' || produto.idCategoria?.toString() === categoriaFiltro;
    return matchNome && matchCategoria;
  });

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const obterNomeCategoria = (produto) => {
    // Se o produto já tem o objeto categoria completo
    if (produto.categoria?.descricao) {
      return produto.categoria.descricao;
    }
    
    // Se só tem o idCategoria, buscar na lista de categorias
    if (produto.idCategoria) {
      const categoria = categorias.find(cat => cat.id === produto.idCategoria);
      return categoria?.descricao || 'Sem categoria';
    }
    
    return 'Sem categoria';
  };

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
                <i className="fas fa-box me-2"></i>
                Gerenciar Produtos
              </h2>
              <p className="text-muted mb-0">Cadastre e gerencie os produtos do Toledo Shop</p>
            </div>
            <button 
              className="btn btn-toledo-primary"
              onClick={handleNovoProduto}
            >
              <i className="fas fa-plus me-2"></i>
              Novo Produto
            </button>
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
              placeholder="Buscar por nome..."
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

      {/* Tabela de Produtos */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-toledo-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Produtos ({produtosFiltrados.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Imagem</th>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Estoque</th>
                      <th>Unidade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map(produto => (
                      <tr key={produto.id}>
                        <td>
                          <img
                            src={produto.urlImagem || 'https://via.placeholder.com/50x50?text=Produto'}
                            alt={produto.nome}
                            className="produto-thumb"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50?text=Produto';
                            }}
                          />
                        </td>
                        <td>
                          <div>
                            <strong>{produto.nome}</strong>
                            <br />
                            <small className="text-muted">{produto.descricao}</small>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-toledo">
                            {obterNomeCategoria(produto)}
                          </span>
                        </td>
                        <td>
                          <span className="preco-toledo">
                            {formatarPreco(produto.valor)}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${produto.estoque > 10 ? 'bg-success' : produto.estoque > 0 ? 'bg-warning' : 'bg-danger'}`}>
                            {produto.estoque}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">{produto.unidadeCompra}</small>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(produto)}
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(produto.id)}
                              title="Excluir"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-toledo-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-box me-2"></i>
                  {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome do Produto *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Categoria *</label>
                      <select
                        className="form-select"
                        name="idCategoria"
                        value={formData.idCategoria}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                          <option key={categoria.id} value={categoria.id.toString()}>
                            {categoria.descricao}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">URL da Imagem</label>
                    <input
                      type="url"
                      className="form-control"
                      name="urlImagem"
                      value={formData.urlImagem}
                      onChange={handleInputChange}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Preço *</label>
                      <div className="input-group">
                        <span className="input-group-text">R$</span>
                        <input
                          type="number"
                          className="form-control"
                          name="valor"
                          value={formData.valor}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Estoque *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="estoque"
                        value={formData.estoque}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Unidade de Compra</label>
                      <input
                        type="text"
                        className="form-control"
                        name="unidadeCompra"
                        value={formData.unidadeCompra}
                        onChange={handleInputChange}
                        placeholder="kg, litro, unidade..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-toledo-primary">
                    <i className="fas fa-save me-2"></i>
                    {produtoEditando ? 'Atualizar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay do Modal */}
      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
}

export default AdminProdutos;
