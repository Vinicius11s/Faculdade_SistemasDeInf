import React, { useState, useEffect } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import ClienteService from '../../services/cliente.service';
import FormaPagamentoService from '../../services/forma-pagamento.service';
import PedidoService from '../../services/pedido.service';
import '../../styles/toledo-shop.css';
import './finalizar-pedido.css';

function FinalizarPedido() {
  const { itens, quantidadeTotal, limparCarrinho } = useCarrinho();
  
  // Debug: verificar estado do carrinho
  console.log('FinalizarPedido - Estado do carrinho:', { itens, quantidadeTotal });
  
  // Debug: verificar localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('toledo-carrinho');
    console.log('FinalizarPedido - LocalStorage:', carrinhoSalvo);
  }, [itens, quantidadeTotal]);
  const [clientes, setClientes] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  
  const clienteService = new ClienteService();
  const formaPagamentoService = new FormaPagamentoService();
  const pedidoService = new PedidoService();

  const [formData, setFormData] = useState({
    idCliente: '',
    idFormaPagamento: '',
    observacoes: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [clientesResponse, formasPagamentoResponse] = await Promise.all([
        clienteService.listar(),
        formaPagamentoService.listar()
      ]);
      
      setClientes(clientesResponse.data || []);
      setFormasPagamento(formasPagamentoResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Dados mock para demonstração
      setClientes([
        {
          id: 1,
          nome: "João Silva",
          email: "joao@email.com",
          telefone: "(11) 99999-9999"
        },
        {
          id: 2,
          nome: "Maria Santos",
          email: "maria@email.com",
          telefone: "(11) 88888-8888"
        }
      ]);
      setFormasPagamento([
        {
          id: 1,
          descricao: "Cartão de Crédito",
          ativo: true
        },
        {
          id: 2,
          descricao: "PIX",
          ativo: true
        },
        {
          id: 3,
          descricao: "Dinheiro",
          ativo: true
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

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + (item.produto.valor * item.quantidade), 0);
  };

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.idCliente || !formData.idFormaPagamento) {
      alert('Por favor, selecione o cliente e a forma de pagamento.');
      return;
    }

    if (itens.length === 0) {
      alert('Não há itens no carrinho.');
      return;
    }

    try {
      setSalvando(true);
      
      // Preparar dados do pedido
      const dadosPedido = {
        idCliente: parseInt(formData.idCliente),
        idFormaPagamento: parseInt(formData.idFormaPagamento),
        descricao: formData.observacoes || 'Pedido criado via sistema',
        data: new Date().toISOString(),
        status: 'Pendente',
        produtoPedidos: itens.map(item => ({
          idProduto: item.produto.id,
          quantidade: item.quantidade,
          valorUnitario: item.produto.valor
        }))
      };

      console.log('Dados do pedido:', dadosPedido);
      
      // Salvar pedido
      await pedidoService.salvar(dadosPedido);
      
      // Limpar carrinho
      limparCarrinho();
      
      // Redirecionar ou mostrar sucesso
      alert('Pedido criado com sucesso!');
      window.location.href = '/admin/pedidos';
      
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      console.error('Detalhes do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || 'Erro ao criar pedido. Tente novamente.';
      alert(errorMessage);
    } finally {
      setSalvando(false);
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
            <p className="mt-3 text-muted">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-toledo-info">
              <i className="fas fa-shopping-cart fa-2x mb-3"></i>
              <h5>Carrinho vazio</h5>
              <p>Não há itens no carrinho para finalizar o pedido.</p>
              <a href="/novo-pedido" className="btn btn-toledo-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Voltar para Produtos
              </a>
            </div>
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
                <i className="fas fa-check-circle me-2"></i>
                Finalizar Pedido
              </h2>
              <p className="text-muted mb-0">Complete as informações do pedido</p>
            </div>
            <a href="/novo-pedido" className="btn btn-toledo-outline">
              <i className="fas fa-arrow-left me-2"></i>
              Voltar
            </a>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Formulário */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-toledo-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-clipboard-list me-2"></i>
                Informações do Pedido
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cliente *</label>
                    <select
                      className="form-select"
                      name="idCliente"
                      value={formData.idCliente}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id.toString()}>
                          {cliente.nome} - {cliente.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Forma de Pagamento *</label>
                    <select
                      className="form-select"
                      name="idFormaPagamento"
                      value={formData.idFormaPagamento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione uma forma de pagamento</option>
                      {formasPagamento.filter(fp => fp.ativo).map(forma => (
                        <option key={forma.id} value={forma.id.toString()}>
                          {forma.descricao}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Observações</label>
                  <textarea
                    className="form-control"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Observações adicionais sobre o pedido..."
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <a href="/novo-pedido" className="btn btn-secondary">
                    Cancelar
                  </a>
                  <button 
                    type="submit" 
                    className="btn btn-toledo-primary"
                    disabled={salvando}
                  >
                    {salvando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Criando Pedido...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Criar Pedido
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-toledo-secondary text-white">
              <h5 className="mb-0">
                <i className="fas fa-receipt me-2"></i>
                Resumo do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {itens.map((item, index) => (
                  <div key={index} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.produto.nome}</h6>
                        <small className="text-muted">
                          {formatarPreco(item.produto.valor)} x {item.quantidade}
                        </small>
                      </div>
                      <div className="text-end">
                        <strong className="text-toledo-primary">
                          {formatarPreco(item.produto.valor * item.quantidade)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Total:</h5>
                  <h4 className="mb-0 text-toledo-primary">
                    {formatarPreco(calcularTotal())}
                  </h4>
                </div>
                <small className="text-muted">
                  {quantidadeTotal} item(s) no pedido
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalizarPedido;
