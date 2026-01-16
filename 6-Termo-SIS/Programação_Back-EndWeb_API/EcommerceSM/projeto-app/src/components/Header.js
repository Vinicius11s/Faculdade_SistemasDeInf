import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import AuthService from '../services/auth.service';

const Header = () => {
  const { quantidadeTotal, abrirCarrinho } = useCarrinho();
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  useEffect(() => {
    // Verificar se o usuário está logado
    const usuarioLogado = authService.getUsuario();
    const autenticado = authService.usuarioAutenticado();
    
    if (usuarioLogado && autenticado) {
      setUsuario(usuarioLogado);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="toledo-header">
      <div className="container">
        {/* Logo e busca */}
        <div className="row align-items-center py-3">
                 <div className="col-md-4">
                   <div className="d-flex align-items-center">
                     <div className="me-3">
                       <i className="fas fa-store fa-2x text-white"></i>
                     </div>
                     <div>
                       <a href="/" className="text-decoration-none">
                         <h2 className="text-white mb-0 fw-bold">Toledo Shop</h2>
                         <p className="text-white-50 mb-0 small">Supermercado Online</p>
                       </a>
                     </div>
                   </div>
                 </div>
          
          {/* Busca */}
          <div className="col-md-4">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar produtos..."
              />
              <button className="btn btn-outline-light" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Carrinho e Usuário */}
          <div className="col-md-4 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center gap-3">
              {/* Saudação do usuário */}
              {isAuthenticated && usuario && (
                <div className="text-white">
                  <i className="fas fa-user me-1"></i>
                  <span className="small">Olá, {usuario}</span>
                </div>
              )}
              
              {/* Botão do carrinho */}
              <button 
                className="btn btn-outline-light position-relative"
                onClick={abrirCarrinho}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                Carrinho
                {quantidadeTotal > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {quantidadeTotal}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navegação integrada */}
        <div className="row">
          <div className="col-12">
            <nav className="border-top border-white border-opacity-25 pt-2">
              <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">
                    <i className="fas fa-home me-1"></i>
                    Início
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="fas fa-cogs me-1"></i>
                    Administração
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/admin/produtos">
                      <i className="fas fa-box me-2"></i>Produtos
                    </a></li>
                    <li><a className="dropdown-item" href="/admin/categorias">
                      <i className="fas fa-tags me-2"></i>Categorias
                    </a></li>
                    <li><a className="dropdown-item" href="/admin/clientes">
                      <i className="fas fa-users me-2"></i>Clientes
                    </a></li>
                    <li><a className="dropdown-item" href="/admin/pedidos">
                      <i className="fas fa-shopping-bag me-2"></i>Pedidos
                    </a></li>
                    <li><a className="dropdown-item" href="/admin/usuarios">
                      <i className="fas fa-user-cog me-2"></i>Usuários
                    </a></li>
                    <li><a className="dropdown-item" href="/admin/formas-pagamento">
                      <i className="fas fa-credit-card me-2"></i>Formas de Pagamento
                    </a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#contato">
                    <i className="fas fa-phone me-1"></i>
                    Contato
                  </a>
                </li>
                <li className="nav-item">
                  {isAuthenticated ? (
                    <button 
                      className="nav-link text-white border-0 bg-transparent"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Logout
                    </button>
                  ) : (
                    <a className="nav-link text-white" href="/login">
                      <i className="fas fa-sign-in-alt me-1"></i>
                      Login
                    </a>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
