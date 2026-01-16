import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tipos de ações do carrinho
const CARRINHO_ACTIONS = {
  ADICIONAR_ITEM: 'ADICIONAR_ITEM',
  REMOVER_ITEM: 'REMOVER_ITEM',
  ATUALIZAR_QUANTIDADE: 'ATUALIZAR_QUANTIDADE',
  LIMPAR_CARRINHO: 'LIMPAR_CARRINHO',
  CARREGAR_CARRINHO: 'CARREGAR_CARRINHO'
};

// Estado inicial do carrinho
const initialState = {
  itens: [],
  quantidadeTotal: 0,
  isOpen: false
};

// Reducer para gerenciar o estado do carrinho
const carrinhoReducer = (state, action) => {
  switch (action.type) {
    case CARRINHO_ACTIONS.ADICIONAR_ITEM:
      const itemExistente = state.itens.find(item => item.produto.id === action.payload.id);
      
      if (itemExistente) {
        // Se o item já existe, aumenta a quantidade
        const itensAtualizados = state.itens.map(item =>
          item.produto.id === action.payload.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
        
        return {
          ...state,
          itens: itensAtualizados,
          quantidadeTotal: state.quantidadeTotal + 1
        };
      } else {
        // Se é um item novo, adiciona ao carrinho
        const novoItem = { produto: action.payload, quantidade: 1 };
        const novosItens = [...state.itens, novoItem];
        
        return {
          ...state,
          itens: novosItens,
          quantidadeTotal: state.quantidadeTotal + 1
        };
      }

    case CARRINHO_ACTIONS.REMOVER_ITEM:
      const itensSemItem = state.itens.filter(item => item.produto.id !== action.payload);
      const quantidadeRemovida = state.itens.find(item => item.produto.id === action.payload)?.quantidade || 0;
      
      return {
        ...state,
        itens: itensSemItem,
        quantidadeTotal: state.quantidadeTotal - quantidadeRemovida
      };

    case CARRINHO_ACTIONS.ATUALIZAR_QUANTIDADE:
      const { id, quantidade } = action.payload;
      const itemAtualizado = state.itens.find(item => item.produto.id === id);
      
      if (!itemAtualizado) return state;
      
      const diferencaQuantidade = quantidade - itemAtualizado.quantidade;
      const itensComQuantidadeAtualizada = state.itens.map(item =>
        item.produto.id === id ? { ...item, quantidade } : item
      );
      
      return {
        ...state,
        itens: itensComQuantidadeAtualizada,
        quantidadeTotal: state.quantidadeTotal + diferencaQuantidade
      };

    case CARRINHO_ACTIONS.LIMPAR_CARRINHO:
      return {
        ...state,
        itens: [],
        quantidadeTotal: 0
      };

    case CARRINHO_ACTIONS.CARREGAR_CARRINHO:
      return {
        ...state,
        ...action.payload
      };

    case 'TOGGLE_CARRINHO':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'ABRIR_CARRINHO':
      return {
        ...state,
        isOpen: true
      };

    case 'FECHAR_CARRINHO':
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};

// Contexto do carrinho
const CarrinhoContext = createContext();

// Função para obter estado inicial do localStorage
const getInitialState = () => {
  const carrinhoSalvo = localStorage.getItem('toledo-carrinho');
  if (carrinhoSalvo) {
    try {
      const estado = JSON.parse(carrinhoSalvo);
      console.log('Estado inicial carregado do localStorage:', estado);
      return estado;
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
    }
  }
  console.log('Usando estado inicial padrão');
  return initialState;
};

// Provider do carrinho
export const CarrinhoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carrinhoReducer, getInitialState());

  // Salvar carrinho no localStorage sempre que o estado mudar
  useEffect(() => {
    if (state.itens.length > 0) {
      localStorage.setItem('toledo-carrinho', JSON.stringify(state));
    } else {
      localStorage.removeItem('toledo-carrinho');
    }
  }, [state]);

  // Funções do carrinho
  const adicionarItem = (produto) => {
    dispatch({
      type: CARRINHO_ACTIONS.ADICIONAR_ITEM,
      payload: produto
    });
  };

  const removerItem = (produtoId) => {
    dispatch({
      type: CARRINHO_ACTIONS.REMOVER_ITEM,
      payload: produtoId
    });
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removerItem(produtoId);
    } else {
      dispatch({
        type: CARRINHO_ACTIONS.ATUALIZAR_QUANTIDADE,
        payload: { id: produtoId, quantidade }
      });
    }
  };

  const limparCarrinho = () => {
    dispatch({
      type: CARRINHO_ACTIONS.LIMPAR_CARRINHO
    });
  };

  const toggleCarrinho = () => {
    dispatch({
      type: 'TOGGLE_CARRINHO'
    });
  };

  const abrirCarrinho = () => {
    dispatch({
      type: 'ABRIR_CARRINHO'
    });
  };

  const fecharCarrinho = () => {
    dispatch({
      type: 'FECHAR_CARRINHO'
    });
  };

  const value = {
    ...state,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    limparCarrinho,
    toggleCarrinho,
    abrirCarrinho,
    fecharCarrinho
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};

// Hook para usar o carrinho
export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

export default CarrinhoContext;
