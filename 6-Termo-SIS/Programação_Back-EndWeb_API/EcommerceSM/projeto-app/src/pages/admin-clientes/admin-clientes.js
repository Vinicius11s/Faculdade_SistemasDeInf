import React, { useState, useEffect } from 'react';
import ClienteService from '../../services/cliente.service';
import '../../styles/toledo-shop.css';
import './admin-clientes.css';

function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  
  const clienteService = new ClienteService();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const response = await clienteService.listar();
      setClientes(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      // Dados mock para demonstração
      setClientes([
        {
          id: 1,
          nome: "João Silva",
          email: "joao@email.com",
          telefone: "(11) 99999-9999",
          cpf: "123.456.789-00",
          endereco: "Rua das Flores, 123",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-567"
        },
        {
          id: 2,
          nome: "Maria Santos",
          email: "maria@email.com",
          telefone: "(11) 88888-8888",
          cpf: "987.654.321-00",
          endereco: "Av. Paulista, 456",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01310-100"
        }
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

  const formatarCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatarCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleCPFChange = (e) => {
    const formatted = formatarCPF(e.target.value);
    setFormData(prev => ({
      ...prev,
      cpf: formatted
    }));
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatarTelefone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleCEPChange = (e) => {
    const formatted = formatarCEP(e.target.value);
    setFormData(prev => ({
      ...prev,
      cep: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clienteEditando) {
        await clienteService.atualizar({ ...formData, id: clienteEditando.id });
      } else {
        await clienteService.salvar(formData);
      }

      setShowModal(false);
      setClienteEditando(null);
      resetForm();
      carregarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Tente novamente.');
    }
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      cpf: cliente.cpf,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      estado: cliente.estado,
      cep: cliente.cep
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clienteService.deletar(id);
        carregarClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Tente novamente.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
  };

  const handleNovoCliente = () => {
    setClienteEditando(null);
    resetForm();
    setShowModal(true);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.cpf.includes(filtro)
  );

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando clientes...</p>
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
                <i className="fas fa-users me-2"></i>
                Gerenciar Clientes
              </h2>
              <p className="text-muted mb-0">Cadastre e gerencie os clientes do Toledo Shop</p>
            </div>
            <button 
              className="btn btn-toledo-primary"
              onClick={handleNovoCliente}
            >
              <i className="fas fa-plus me-2"></i>
              Novo Cliente
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
              placeholder="Buscar por nome, email ou CPF..."
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

      {/* Tabela de Clientes */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-toledo-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Clientes ({clientesFiltrados.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>CPF</th>
                      <th>Cidade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesFiltrados.map(cliente => (
                      <tr key={cliente.id}>
                        <td>
                          <div>
                            <strong>{cliente.nome}</strong>
                            <br />
                            <small className="text-muted">{cliente.endereco}</small>
                          </div>
                        </td>
                        <td>
                          <a href={`mailto:${cliente.email}`} className="text-decoration-none">
                            {cliente.email}
                          </a>
                        </td>
                        <td>
                          <a href={`tel:${cliente.telefone}`} className="text-decoration-none">
                            {cliente.telefone}
                          </a>
                        </td>
                        <td>
                          <code>{cliente.cpf}</code>
                        </td>
                        <td>
                          <span className="badge badge-toledo">
                            {cliente.cidade}/{cliente.estado}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(cliente)}
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(cliente.id)}
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
                  <i className="fas fa-user me-2"></i>
                  {clienteEditando ? 'Editar Cliente' : 'Novo Cliente'}
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
                      <label className="form-label">Nome Completo *</label>
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
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Telefone *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleTelefoneChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CPF *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleCPFChange}
                        placeholder="123.456.789-00"
                        maxLength="14"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Endereço *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      placeholder="Rua, número, bairro"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Cidade *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Estado *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        placeholder="SP"
                        maxLength="2"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">CEP *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cep"
                        value={formData.cep}
                        onChange={handleCEPChange}
                        placeholder="01234-567"
                        maxLength="9"
                        required
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
                    {clienteEditando ? 'Atualizar' : 'Salvar'}
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

export default AdminClientes;




