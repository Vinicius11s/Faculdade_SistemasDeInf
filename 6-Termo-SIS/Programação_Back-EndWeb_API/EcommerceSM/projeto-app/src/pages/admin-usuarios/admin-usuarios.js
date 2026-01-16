import React, { useState, useEffect } from 'react';
import UsuarioService from '../../services/usuario.service';
import '../../styles/toledo-shop.css';
import './admin-usuarios.css';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [showSenhaModal, setShowSenhaModal] = useState(false);
  
  const usuarioService = new UsuarioService();

  const [formData, setFormData] = useState({
    login: '',
    senha: '',
    ativo: true
  });

  const [senhaData, setSenhaData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuarioService.listar();
      setUsuarios(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      // Dados mock para demonstração
      setUsuarios([
        {
          id: 1,
          nome: "Admin Sistema",
          email: "admin@toledoshop.com",
          ativo: true,
          dataCriacao: "2024-01-01T00:00:00"
        },
        {
          id: 2,
          nome: "João Funcionário",
          email: "joao@toledoshop.com",
          ativo: true,
          dataCriacao: "2024-01-15T10:30:00"
        },
        {
          id: 3,
          nome: "Maria Gerente",
          email: "maria@toledoshop.com",
          ativo: false,
          dataCriacao: "2024-01-10T14:20:00"
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

  const handleSenhaInputChange = (e) => {
    const { name, value } = e.target;
    setSenhaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosUsuario = {
        ...formData,
        senha: formData.senha || undefined // Só inclui senha se foi preenchida
      };

      if (usuarioEditando) {
        await usuarioService.atualizar({ ...dadosUsuario, id: usuarioEditando.id });
      } else {
        await usuarioService.salvar(dadosUsuario);
      }

      setShowModal(false);
      setUsuarioEditando(null);
      resetForm();
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário. Tente novamente.');
    }
  };

  const handleSenhaSubmit = async (e) => {
    e.preventDefault();
    
    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    if (senhaData.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await usuarioService.alterarSenha(usuarioEditando.id, senhaData.senhaAtual, senhaData.novaSenha);
      setShowSenhaModal(false);
      setSenhaData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
      alert('Senha alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Erro ao alterar senha. Verifique a senha atual.');
    }
  };

  const handleEdit = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      login: usuario.login || usuario.nome || '',
      senha: '',
      ativo: usuario.ativo !== undefined ? usuario.ativo : true
    });
    setShowModal(true);
  };

  const handleAlterarSenha = (usuario) => {
    setUsuarioEditando(usuario);
    setSenhaData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    setShowSenhaModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await usuarioService.deletar(id);
        carregarUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Tente novamente.');
      }
    }
  };

  const handleToggleStatus = async (id, novoStatus) => {
    try {
      await usuarioService.ativarDesativar(id);
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status. Tente novamente.');
    }
  };

  const resetForm = () => {
    setFormData({
      login: '',
      senha: '',
      ativo: true
    });
  };

  const handleNovoUsuario = () => {
    setUsuarioEditando(null);
    resetForm();
    setShowModal(true);
  };

  const usuariosFiltrados = usuarios.filter(usuario => {
    if (!usuario) return false;
    const login = usuario.login || usuario.nome || '';
    const email = usuario.email || '';
    return login.toLowerCase().includes(filtro.toLowerCase()) ||
           email.toLowerCase().includes(filtro.toLowerCase());
  });

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando usuários...</p>
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
                <i className="fas fa-user-cog me-2"></i>
                Gerenciar Usuários/Funcionários
              </h2>
              <p className="text-muted mb-0">Administre os usuários do sistema Toledo Shop</p>
            </div>
            <button 
              className="btn btn-toledo-primary"
              onClick={handleNovoUsuario}
            >
              <i className="fas fa-plus me-2"></i>
              Novo Usuário
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
              placeholder="Buscar por login..."
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

      {/* Tabela de Usuários */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-toledo-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Usuários ({usuariosFiltrados.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Data de Criação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.map(usuario => (
                      <tr key={usuario.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="usuario-avatar me-3">
                              <i className="fas fa-user"></i>
                            </div>
                            <div>
                              <strong>{usuario.login || usuario.nome || 'Usuário'}</strong>
                              <br />
                              <small className="text-muted">ID: {usuario.id}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          {usuario.email ? (
                            <a href={`mailto:${usuario.email}`} className="text-decoration-none">
                              {usuario.email}
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${usuario.ativo !== false ? 'bg-success' : 'bg-secondary'}`}>
                            {usuario.ativo !== false ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {usuario.dataCriacao ? formatarData(usuario.dataCriacao) : '-'}
                          </small>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(usuario)}
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleAlterarSenha(usuario)}
                              title="Alterar Senha"
                            >
                              <i className="fas fa-key"></i>
                            </button>
                            <button
                              className={`btn btn-sm ${usuario.ativo !== false ? 'btn-outline-danger' : 'btn-outline-success'}`}
                              onClick={() => handleToggleStatus(usuario.id, usuario.ativo === false)}
                              title={usuario.ativo !== false ? 'Desativar' : 'Ativar'}
                            >
                              <i className={`fas ${usuario.ativo !== false ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(usuario.id)}
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-toledo-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-user me-2"></i>
                  {usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}
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
                    <label className="form-label">Login *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="login"
                      value={formData.login}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="form-text">
                      Nome de usuário para acesso ao sistema
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Senha {!usuarioEditando && '*'}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      placeholder={usuarioEditando ? "Deixe em branco para manter a atual" : "Digite a senha"}
                      required={!usuarioEditando}
                    />
                    {usuarioEditando && (
                      <div className="form-text">
                        Deixe em branco para manter a senha atual
                      </div>
                    )}
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
                        Usuário ativo
                      </label>
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
                    {usuarioEditando ? 'Atualizar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Senha */}
      {showSenhaModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
                  <div className="modal-header bg-toledo-warning text-dark">
                <h5 className="modal-title">
                  <i className="fas fa-key me-2"></i>
                  Alterar Senha - {usuarioEditando?.login || usuarioEditando?.nome || 'Usuário'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSenhaModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSenhaSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Senha Atual *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="senhaAtual"
                      value={senhaData.senhaAtual}
                      onChange={handleSenhaInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Nova Senha *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="novaSenha"
                      value={senhaData.novaSenha}
                      onChange={handleSenhaInputChange}
                      minLength="6"
                      required
                    />
                    <div className="form-text">
                      Mínimo de 6 caracteres
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar Nova Senha *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmarSenha"
                      value={senhaData.confirmarSenha}
                      onChange={handleSenhaInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowSenhaModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-toledo-warning">
                    <i className="fas fa-save me-2"></i>
                    Alterar Senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay dos Modais */}
      {(showModal || showSenhaModal) && <div className="modal-backdrop show"></div>}
    </div>
  );
}

export default AdminUsuarios;



