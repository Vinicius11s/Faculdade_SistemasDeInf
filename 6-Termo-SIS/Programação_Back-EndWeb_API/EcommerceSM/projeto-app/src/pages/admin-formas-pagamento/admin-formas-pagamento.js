import React, { useState, useEffect } from 'react';
import FormaPagamentoService from '../../services/forma-pagamento.service';
import '../../styles/toledo-shop.css';
import './admin-formas-pagamento.css';

function AdminFormasPagamento() {
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formaPagamentoEditando, setFormaPagamentoEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  
  const formaPagamentoService = new FormaPagamentoService();

  const [formData, setFormData] = useState({
    descricao: '',
    ativo: true
  });

  useEffect(() => {
    carregarFormasPagamento();
  }, []);

  const carregarFormasPagamento = async () => {
    try {
      setLoading(true);
      const response = await formaPagamentoService.listar();
      setFormasPagamento(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar formas de pagamento:', error);
      // Dados mock para demonstração
      setFormasPagamento([
        {
          id: 1,
          descricao: "Cartão de Crédito",
          ativo: true
        },
        {
          id: 2,
          descricao: "Cartão de Débito",
          ativo: true
        },
        {
          id: 3,
          descricao: "PIX",
          ativo: true
        },
        {
          id: 4,
          descricao: "Dinheiro",
          ativo: true
        },
        {
          id: 5,
          descricao: "Boleto Bancário",
          ativo: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formaPagamentoEditando) {
        await formaPagamentoService.atualizar({ ...formData, id: formaPagamentoEditando.id });
      } else {
        await formaPagamentoService.salvar(formData);
      }

      setShowModal(false);
      setFormaPagamentoEditando(null);
      resetForm();
      carregarFormasPagamento();
    } catch (error) {
      console.error('Erro ao salvar forma de pagamento:', error);
      alert('Erro ao salvar forma de pagamento. Tente novamente.');
    }
  };

  const handleEdit = (formaPagamento) => {
    setFormaPagamentoEditando(formaPagamento);
    setFormData({
      descricao: formaPagamento.descricao,
      ativo: formaPagamento.ativo
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta forma de pagamento?')) {
      try {
        console.log('Excluindo forma de pagamento ID:', id);
        await formaPagamentoService.deletar(id);
        carregarFormasPagamento();
      } catch (error) {
        console.error('Erro ao excluir forma de pagamento:', error);
        console.error('Detalhes do erro:', error.response?.data);
        console.error('Status do erro:', error.response?.status);
        
        const errorMessage = error.response?.data?.message || 'Erro ao excluir forma de pagamento. Tente novamente.';
        alert(errorMessage);
      }
    }
  };

  const handleToggleStatus = async (id, novoStatus) => {
    try {
      // Buscar a forma de pagamento completa primeiro
      const formaPagamento = formasPagamento.find(fp => fp.id === id);
      if (!formaPagamento) {
        alert('Forma de pagamento não encontrada.');
        return;
      }
      
      console.log('Atualizando forma de pagamento:', {
        id: formaPagamento.id,
        descricao: formaPagamento.descricao,
        ativo: novoStatus
      });
      
      // Atualizar com todos os campos necessários
      await formaPagamentoService.atualizar({ 
        id: formaPagamento.id,
        descricao: formaPagamento.descricao,
        ativo: novoStatus 
      });
      carregarFormasPagamento();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      console.error('Detalhes do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || 'Erro ao alterar status. Tente novamente.';
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      descricao: '',
      ativo: true
    });
  };

  const handleNovaFormaPagamento = () => {
    setFormaPagamentoEditando(null);
    resetForm();
    setShowModal(true);
  };

  const formasPagamentoFiltradas = formasPagamento.filter(forma =>
    forma.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  const getIconeFormaPagamento = (descricao) => {
    const descricaoLower = descricao.toLowerCase();
    if (descricaoLower.includes('cartão') && descricaoLower.includes('crédito')) {
      return 'fas fa-credit-card';
    } else if (descricaoLower.includes('cartão') && descricaoLower.includes('débito')) {
      return 'fas fa-credit-card';
    } else if (descricaoLower.includes('pix')) {
      return 'fas fa-qrcode';
    } else if (descricaoLower.includes('dinheiro')) {
      return 'fas fa-money-bill-wave';
    } else if (descricaoLower.includes('boleto')) {
      return 'fas fa-file-invoice';
    } else {
      return 'fas fa-payment';
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando formas de pagamento...</p>
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
                <i className="fas fa-credit-card me-2"></i>
                Gerenciar Formas de Pagamento
              </h2>
              <p className="text-muted mb-0">Configure as formas de pagamento aceitas</p>
            </div>
            <button 
              className="btn btn-toledo-primary"
              onClick={handleNovaFormaPagamento}
            >
              <i className="fas fa-plus me-2"></i>
              Nova Forma de Pagamento
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
              placeholder="Buscar forma de pagamento..."
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

      {/* Grid de Formas de Pagamento */}
      <div className="row">
        {formasPagamentoFiltradas.map(formaPagamento => (
          <div key={formaPagamento.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className={`card forma-pagamento-card h-100 ${!formaPagamento.ativo ? 'inactive' : ''}`}>
              <div className="card-body text-center">
                <div className={`forma-pagamento-icon mb-3 ${!formaPagamento.ativo ? 'inactive' : ''}`}>
                  <i className={getIconeFormaPagamento(formaPagamento.descricao)}></i>
                </div>
                <h5 className="card-title text-toledo-primary">
                  {formaPagamento.descricao}
                </h5>
                <p className="card-text">
                  <span className={`badge ${formaPagamento.ativo ? 'bg-success' : 'bg-secondary'}`}>
                    {formaPagamento.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </p>
                <div className="btn-group w-100" role="group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(formaPagamento)}
                    title="Editar"
                  >
                    <i className="fas fa-edit me-1"></i>
                    Editar
                  </button>
                  <button
                    className={`btn btn-sm ${formaPagamento.ativo ? 'btn-outline-warning' : 'btn-outline-success'}`}
                    onClick={() => handleToggleStatus(formaPagamento.id, !formaPagamento.ativo)}
                    title={formaPagamento.ativo ? 'Desativar' : 'Ativar'}
                  >
                    <i className={`fas ${formaPagamento.ativo ? 'fa-pause' : 'fa-play'} me-1`}></i>
                    {formaPagamento.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(formaPagamento.id)}
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

      {/* Mensagem quando não há formas de pagamento */}
      {formasPagamentoFiltradas.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-toledo-info text-center">
              <i className="fas fa-info-circle fa-2x mb-3"></i>
              <h5>Nenhuma forma de pagamento encontrada</h5>
              <p>
                {filtro 
                  ? `Nenhuma forma de pagamento corresponde ao filtro "${filtro}"`
                  : "Não há formas de pagamento cadastradas no sistema"
                }
              </p>
              {!filtro && (
                <button 
                  className="btn btn-toledo-primary"
                  onClick={handleNovaFormaPagamento}
                >
                  <i className="fas fa-plus me-2"></i>
                  Cadastrar Primeira Forma de Pagamento
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
                  <i className="fas fa-credit-card me-2"></i>
                  {formaPagamentoEditando ? 'Editar Forma de Pagamento' : 'Nova Forma de Pagamento'}
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
                    <label className="form-label">Descrição da Forma de Pagamento *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      placeholder="Ex: Cartão de Crédito"
                      required
                    />
                    <div className="form-text">
                      Digite um nome descritivo para a forma de pagamento
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleInputChange}
                        id="ativo"
                      />
                      <label className="form-check-label" htmlFor="ativo">
                        Forma de pagamento ativa
                      </label>
                    </div>
                    <div className="form-text">
                      Desmarque para desativar esta forma de pagamento
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
                    {formaPagamentoEditando ? 'Atualizar' : 'Salvar'}
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

export default AdminFormasPagamento;
