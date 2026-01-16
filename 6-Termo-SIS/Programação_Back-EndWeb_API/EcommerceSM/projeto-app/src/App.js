import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home-page/home-page';
import LoginPage from './pages/login-page/login-page';
import ProdutoPage from './pages/produto-page/produto-page';
import CategoriaPage from './pages/categoria-page/categoria-page';
import CategoriaCadastroPage  from './pages/categoria-page/categoria-cadastro-page';
import CadastroCliente from './pages/cadastro-cliente/cadastro-cliente';
import FormasPagamento from './pages/formas-pagamento/formas-pagamento';
import PrivateRoute from './components/private-route/private-route';

// Importações das telas administrativas
import AdminProdutos from './pages/admin-produtos/admin-produtos';
import AdminCategorias from './pages/admin-categorias/admin-categorias';
import AdminClientes from './pages/admin-clientes/admin-clientes';
import AdminPedidos from './pages/admin-pedidos/admin-pedidos';
import AdminUsuarios from './pages/admin-usuarios/admin-usuarios';
import AdminFormasPagamento from './pages/admin-formas-pagamento/admin-formas-pagamento';

// Importações das telas de pedidos
import NovoPedido from './pages/novo-pedido/novo-pedido';
import FinalizarPedido from './pages/finalizar-pedido/finalizar-pedido';
import TesteCarrinho from './pages/teste-carrinho/teste-carrinho';

function App() {
  const location = useLocation();

  // Define em quais rotas o Header NÃO deve aparecer
  const rotasSemHeader = ['/login', '/cadastro-cliente'];
  const exibirHeader = !rotasSemHeader.includes(location.pathname);
  
  // Define em quais rotas o Footer NÃO deve aparecer
  const rotasSemFooter = ['/login'];
  const exibirFooter = !rotasSemFooter.includes(location.pathname);

return (
    <>
      {exibirHeader && <Header />}

      <Routes>
        {/* Login sem header */}
        <Route 
          path="/login" 
          element={
            <LoginPage />
            } 
          />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/produto"
          element={
            <PrivateRoute>
              <ProdutoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categoria"
          element={
            <PrivateRoute>
              <CategoriaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categoria/cadastro"
          element={
            <PrivateRoute>
              <CategoriaCadastroPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categoria/editar/:id"
          element={
            <PrivateRoute>
              <CategoriaCadastroPage />
            </PrivateRoute>
          }
        />
        
        {/* Rotas públicas */}
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        
        {/* Rotas administrativas */}
        <Route
          path="/formas-pagamento"
          element={
            <PrivateRoute>
              <FormasPagamento />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Produtos */}
        <Route
          path="/admin/produtos"
          element={
            <PrivateRoute>
              <AdminProdutos />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Categorias */}
        <Route
          path="/admin/categorias"
          element={
            <PrivateRoute>
              <AdminCategorias />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Clientes */}
        <Route
          path="/admin/clientes"
          element={
            <PrivateRoute>
              <AdminClientes />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Pedidos */}
        <Route
          path="/admin/pedidos"
          element={
            <PrivateRoute>
              <AdminPedidos />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Usuários */}
        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute>
              <AdminUsuarios />
            </PrivateRoute>
          }
        />
        
        {/* Gerenciamento de Formas de Pagamento */}
        <Route
          path="/admin/formas-pagamento"
          element={
            <PrivateRoute>
              <AdminFormasPagamento />
            </PrivateRoute>
          }
        />
        
        {/* Telas de Pedidos */}
        <Route
          path="/novo-pedido"
          element={
            <PrivateRoute>
              <NovoPedido />
            </PrivateRoute>
          }
        />
        <Route
          path="/finalizar-pedido"
          element={
            <PrivateRoute>
              <FinalizarPedido />
            </PrivateRoute>
          }
        />
        <Route
          path="/teste-carrinho"
          element={
            <PrivateRoute>
              <TesteCarrinho />
            </PrivateRoute>
          }
        />
      </Routes>
      {exibirFooter && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  // BrowserRouter aqui para permitir o useNavigate dentro de App
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  );
}
