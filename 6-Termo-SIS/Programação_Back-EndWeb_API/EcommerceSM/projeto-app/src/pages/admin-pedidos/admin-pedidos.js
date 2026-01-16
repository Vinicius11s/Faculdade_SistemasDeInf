import React, { useState, useEffect } from 'react';
import PedidoService from '../../services/pedido.service';
import ClienteService from '../../services/cliente.service';
import '../../styles/toledo-shop.css';
import './admin-pedidos.css';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');
  
  const pedidoService = new PedidoService();
  const clienteService = new ClienteService();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      console.log('Carregando dados de pedidos...');
      
      const [pedidosResponse, clientesResponse] = await Promise.all([
        pedidoService.listar(),
        clienteService.listar()
      ]);
      
      console.log('Resposta da API - Pedidos:', pedidosResponse);
      console.log('Resposta da API - Clientes:', clientesResponse);
      
      // Debug: verificar estrutura dos dados
      console.log('Estrutura do primeiro pedido:', pedidosResponse.data?.[0]);
      console.log('Campos disponíveis:', pedidosResponse.data?.[0] ? Object.keys(pedidosResponse.data[0]) : 'Nenhum pedido');
      console.log('Todos os pedidos:', pedidosResponse.data);
      
      // Verificar se os pedidos têm ID
      pedidosResponse.data?.forEach((pedido, index) => {
        console.log(`Pedido ${index}:`, {
          id: pedido.id,
          hasId: !!pedido.id,
          idType: typeof pedido.id,
          status: pedido.status
        });
      });
      
      setPedidos(pedidosResponse.data || []);
      setClientes(clientesResponse.data || []);
      
      console.log('Pedidos carregados:', pedidosResponse.data?.length || 0);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      console.error('Detalhes do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      // Dados mock para demonstração
      setPedidos([
        {
          id: 1,
          numeroPedido: "PED-001234",
          dataPedido: "2024-01-15T10:30:00",
          status: "Pendente",
          valorTotal: 45.80,
          idCliente: 1,
          cliente: { nome: "João Silva" },
          produtosPedido: [
            {
              id: 1,
              quantidade: 2,
              valorUnitario: 12.90,
              produto: { nome: "Arroz Branco 5kg" }
            },
            {
              id: 2,
              quantidade: 1,
              valorUnitario: 4.50,
              produto: { nome: "Leite Integral 1L" }
            }
          ]
        },
        {
          id: 2,
          numeroPedido: "PED-001235",
          dataPedido: "2024-01-15T14:20:00",
          status: "Confirmado",
          valorTotal: 28.50,
          idCliente: 2,
          cliente: { nome: "Maria Santos" },
          produtosPedido: [
            {
              id: 3,
              quantidade: 3,
              valorUnitario: 9.50,
              produto: { nome: "Pão Francês" }
            }
          ]
        }
      ]);
      setClientes([
        { id: 1, nome: "João Silva" },
        { id: 2, nome: "Maria Santos" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLimparTodos = async () => {
    if (!window.confirm('Tem certeza que deseja limpar TODOS os pedidos? Esta ação não pode ser desfeita!')) {
      return;
    }
    
    try {
      const response = await pedidoService.limparTodos();
      console.log('Resposta ao limpar pedidos:', response);
      alert('Todos os pedidos foram removidos com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao limpar pedidos:', error);
      console.error('Detalhes do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.details || 
                          error.message || 
                          'Erro ao limpar pedidos. Verifique o console para mais detalhes.';
      alert(`Erro ao limpar pedidos: ${errorMessage}`);
    }
  };

  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      // Buscar o pedido completo primeiro
      const pedido = pedidos.find(p => p.id === pedidoId);
      if (!pedido) {
        alert('Pedido não encontrado.');
        return;
      }
      
      // Verificar se o pedido tem ID válido
      if (!pedido.id || pedido.id === undefined) {
        alert('Pedido não possui ID válido. Não é possível atualizar.');
        return;
      }
      
      // Atualizar com todos os campos necessários
      const dadosAtualizados = {
        id: pedido.id,
        descricao: pedido.descricao || 'Pedido atualizado',
        data: pedido.data || new Date().toISOString(),
        status: novoStatus,
        valorTotal: pedido.valorTotal || calcularValorTotal(pedido),
        idCliente: pedido.idCliente,
        idFormaPagamento: pedido.idFormaPagamento,
        ProdutoPedidos: pedido.produtoPedidos || pedido.ProdutoPedidos || []
      };
      
      console.log('Atualizando pedido:', dadosAtualizados);
      
      await pedidoService.atualizar(dadosAtualizados);
      carregarDados();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      console.error('Detalhes do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar status do pedido. Tente novamente.';
      alert(errorMessage);
    }
  };

  const handleViewDetails = (pedido) => {
    setPedidoSelecionado(pedido);
    setShowModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-warning';
      case 'confirmado':
        return 'bg-info';
      case 'preparando':
        return 'bg-primary';
      case 'saiu para entrega':
        return 'bg-secondary';
      case 'entregue':
        return 'bg-success';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'fas fa-clock';
      case 'confirmado':
        return 'fas fa-check-circle';
      case 'preparando':
        return 'fas fa-utensils';
      case 'saiu para entrega':
        return 'fas fa-truck';
      case 'entregue':
        return 'fas fa-check-double';
      case 'cancelado':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleString('pt-BR');
  };

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const calcularValorTotal = (pedido) => {
    if (pedido.valorTotal && pedido.valorTotal > 0) {
      return pedido.valorTotal;
    }
    
    // Calcular baseado nos produtos do pedido
    if (pedido.produtoPedidos && pedido.produtoPedidos.length > 0) {
      return pedido.produtoPedidos.reduce((total, item) => {
        return total + (item.valorUnitario * item.quantidade);
      }, 0);
    }
    
    return 0;
  };

  const pedidosFiltrados = pedidos.filter(pedido => {
    // Buscar por ID do pedido ou descrição
    const matchId = pedido.id?.toString().includes(filtro.toLowerCase());
    const matchDescricao = pedido.descricao?.toLowerCase().includes(filtro.toLowerCase());
    
    // Buscar por nome do cliente (se disponível)
    const matchCliente = pedido.cliente?.nome?.toLowerCase().includes(filtro.toLowerCase());
    
    // Filtrar por status
    const matchStatus = statusFiltro === '' || pedido.status?.toLowerCase() === statusFiltro.toLowerCase();
    
    return (matchId || matchDescricao || matchCliente) && matchStatus;
  });

  const statusOptions = [
    'Pendente',
    'Confirmado',
    'Preparando',
    'Saiu para Entrega',
    'Entregue',
    'Cancelado'
  ];

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-toledo-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando pedidos...</p>
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
                <i className="fas fa-shopping-bag me-2"></i>
                Gerenciar Pedidos
              </h2>
              <p className="text-muted mb-0">Visualize e gerencie os pedidos dos clientes</p>
            </div>
            <div>
              <button 
                className="btn btn-toledo-outline me-2"
                onClick={carregarDados}
              >
                <i className="fas fa-sync me-2"></i>
                Atualizar
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleLimparTodos}
              >
                <i className="fas fa-trash me-2"></i>
                Limpar Todos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número ou cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos os status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button 
            className="btn btn-toledo-outline w-100"
            onClick={() => {
              setFiltro('');
              setStatusFiltro('');
            }}
          >
            <i className="fas fa-times me-2"></i>
            Limpar Filtros
          </button>
        </div>
        <div className="col-md-2">
          <div className="text-end">
            <small className="text-muted">
              {pedidosFiltrados.length} pedido(s)
            </small>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="row">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id} className="col-lg-6 col-xl-4 mb-4">
            <div className="card pedido-card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">
                    <i className="fas fa-receipt me-2"></i>
                    Pedido #{pedido.id}
                  </h6>
                  <small className="text-muted">
                    {formatarData(pedido.data)}
                  </small>
                </div>
                <span className={`badge ${getStatusBadgeClass(pedido.status)}`}>
                  <i className={`${getStatusIcon(pedido.status)} me-1`}></i>
                  {pedido.status}
                </span>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Cliente:</strong> {pedido.cliente?.nome || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>Produtos:</strong>
                  <ul className="list-unstyled mt-2">
                    {pedido.produtoPedidos?.map((produtoPedido, index) => (
                      <li key={`${pedido.id || 'mock'}-${index}`} className="small text-muted">
                        {produtoPedido.quantidade}x {produtoPedido.produto?.nome}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-toledo-primary">
                      {formatarPreco(calcularValorTotal(pedido))}
                    </strong>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleViewDetails(pedido)}
                  >
                    <i className="fas fa-eye me-1"></i>
                    Ver Detalhes
                  </button>
                </div>
              </div>
              <div className="card-footer">
                <div className="btn-group w-100" role="group">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      className={`btn btn-sm ${pedido.status === status ? 'btn-toledo-primary' : 'btn-outline-secondary'}`}
                      onClick={() => handleStatusChange(pedido.id, status)}
                      disabled={pedido.status === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há pedidos */}
      {pedidosFiltrados.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-toledo-info text-center">
              <i className="fas fa-shopping-bag fa-2x mb-3"></i>
              <h5>Nenhum pedido encontrado</h5>
              <p>
                {filtro || statusFiltro
                  ? "Nenhum pedido corresponde aos filtros aplicados"
                  : "Não há pedidos cadastrados no sistema"
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Pedido */}
      {showModal && pedidoSelecionado && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-toledo-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-receipt me-2"></i>
                  Detalhes do Pedido #{pedidoSelecionado.id}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Número do Pedido:</strong><br />
                    #{pedidoSelecionado.id}
                  </div>
                  <div className="col-md-6">
                    <strong>Data do Pedido:</strong><br />
                    {formatarData(pedidoSelecionado.data)}
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Cliente:</strong><br />
                    {pedidoSelecionado.cliente?.nome}
                  </div>
                  <div className="col-md-6">
                    <strong>Status:</strong><br />
                    <span className={`badge ${getStatusBadgeClass(pedidoSelecionado.status)}`}>
                      <i className={`${getStatusIcon(pedidoSelecionado.status)} me-1`}></i>
                      {pedidoSelecionado.status}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Produtos:</strong>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Valor Unitário</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidoSelecionado.produtoPedidos?.map((produtoPedido, index) => (
                          <tr key={index}>
                            <td>{produtoPedido.produto?.nome}</td>
                            <td>{produtoPedido.quantidade}</td>
                            <td>{formatarPreco(produtoPedido.valorUnitario)}</td>
                            <td>{formatarPreco(produtoPedido.quantidade * produtoPedido.valorUnitario)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-active">
                          <th colSpan="3">Total:</th>
                          <th>{formatarPreco(calcularValorTotal(pedidoSelecionado))}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay do Modal */}
      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
}

export default AdminPedidos;
