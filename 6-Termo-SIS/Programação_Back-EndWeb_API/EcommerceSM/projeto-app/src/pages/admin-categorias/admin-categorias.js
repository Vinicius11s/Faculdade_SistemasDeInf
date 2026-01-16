import React, { useState, useEffect } from 'react';
import CategoriaService from '../../services/categoria.service';
import '../../styles/toledo-shop.css';
import './admin-categorias.css';

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  
  const categoriaService = new CategoriaService();

  const [formData, setFormData] = useState({
    descricao: ''
  });

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriaService.listar();
      setCategorias(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      // Dados mock para demonstração
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
      if (categoriaEditando) {
        await categoriaService.atualizar({ ...formData, id: categoriaEditando.id });
      } else {
        await categoriaService.salvar(formData);
      }

      setShowModal(false);
      setCategoriaEditando(null);
      resetForm();
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria. Tente novamente.');
    }
  };

  const handleEdit = (categoria) => {
    setCategoriaEditando(categoria);
    setFormData({
      descricao: categoria.descricao
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await categoriaService.deletar(id);
        carregarCategorias();
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        alert('Erro ao excluir categoria. Tente novamente.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      descricao: ''
    });
  };

  const handleNovaCategoria = () => {
    setCategoriaEditando(null);
    resetForm();
    setShowModal(true);
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando categorias...</p>
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
                <i className="fas fa-tags me-2"></i>
                Gerenciar Categorias
              </h2>
              <p className="text-muted mb-0">Organize os produtos por categorias</p>
            </div>
            <button 
              className="btn btn-toledo-primary"
              onClick={handleNovaCategoria}
            >
              <i className="fas fa-plus me-2"></i>
              Nova Categoria
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
              placeholder="Buscar categoria..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <button 
            className="btn btn-toledo-outline"
            onClick={() => setFiltro('')}
          >
            <i className="fas fa-times me-2"></i>
            Limpar Filtro
          </button>
        </div>
      </div>

      {/* Grid de Categorias */}
      <div className="row">
        {categoriasFiltradas.map(categoria => (
          <div key={categoria.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card categoria-card h-100">
              <div className="card-body text-center">
                <div className="categoria-icon mb-3">
                  <i className="fas fa-tag"></i>
                </div>
                <h5 className="card-title text-toledo-primary">
                  {categoria.descricao}
                </h5>
                <p className="card-text text-muted small">
                  ID: {categoria.id}
                </p>
                <div className="btn-group w-100" role="group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(categoria)}
                    title="Editar"
                  >
                    <i className="fas fa-edit me-1"></i>
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(categoria.id)}
                    title="Excluir"
                  >
                    <i className="fas fa-trash me-1"></i>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há categorias */}
      {categoriasFiltradas.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-toledo-info text-center">
              <i className="fas fa-info-circle fa-2x mb-3"></i>
              <h5>Nenhuma categoria encontrada</h5>
              <p>
                {filtro 
                  ? `Nenhuma categoria corresponde ao filtro "${filtro}"`
                  : "Não há categorias cadastradas no sistema"
                }
              </p>
              {!filtro && (
                <button 
                  className="btn btn-toledo-primary"
                  onClick={handleNovaCategoria}
                >
                  <i className="fas fa-plus me-2"></i>
                  Cadastrar Primeira Categoria
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro/Edição */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-toledo-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-tag me-2"></i>
                  {categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Descrição da Categoria *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      placeholder="Ex: Grãos e Cereais"
                      required
                    />
                    <div className="form-text">
                      Digite um nome descritivo para a categoria
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
                    {categoriaEditando ? 'Atualizar' : 'Salvar'}
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

export default AdminCategorias;




