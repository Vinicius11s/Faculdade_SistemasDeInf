import { useState, useEffect } from 'react';
import ProdutoService from '../../services/produto.service';
import CategoriaService from '../../services/categoria.service';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import CarrinhoSidebar from '../../components/CarrinhoSidebar';
import '../../styles/toledo-shop.css';
import './home-page.css';
import './carrinho-flutuante.css';

function HomePage() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [erroApi, setErroApi] = useState(false);

    const produtoService = new ProdutoService();
    const categoriaService = new CategoriaService();
    const { adicionarItem, itens, quantidadeTotal, limparCarrinho } = useCarrinho();

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            console.log('Tentando carregar dados da API...');
            
            const [produtosResponse, categoriasResponse] = await Promise.all([
                produtoService.listar(),
                categoriaService.listar()
            ]);
            
            console.log('Resposta da API - Produtos:', produtosResponse);
            console.log('Resposta da API - Categorias:', categoriasResponse);
            
            setProdutos(produtosResponse.data || []);
            setCategorias(categoriasResponse.data || []);
            
            // Se não há categorias da API, usar categorias mock
            if (!categoriasResponse.data || categoriasResponse.data.length === 0) {
                console.log('Nenhuma categoria encontrada na API, usando categorias mock...');
                setCategorias([
                    { id: 1, descricao: "Grãos e Cereais" },
                    { id: 2, descricao: "Laticínios" },
                    { id: 3, descricao: "Padaria" },
                    { id: 4, descricao: "Frutas" },
                    { id: 5, descricao: "Bebidas" },
                    { id: 6, descricao: "Carnes" }
                ]);
            }
            
            console.log('Dados carregados com sucesso da API');
        } catch (error) {
            console.error('Erro ao carregar dados da API:', error);
            console.error('Detalhes do erro:', error.response?.data);
            console.error('Status do erro:', error.response?.status);
            
            setErroApi(true);
            
            // Tentar carregar dados mock apenas se a API não estiver disponível
            console.log('Usando dados mock como fallback...');
            
            // Garantir que sempre temos categorias
            setCategorias([
                { id: 1, descricao: "Grãos e Cereais" },
                { id: 2, descricao: "Laticínios" },
                { id: 3, descricao: "Padaria" },
                { id: 4, descricao: "Frutas" },
                { id: 5, descricao: "Bebidas" },
                { id: 6, descricao: "Carnes" }
            ]);
            setProdutos([
                {
                    id: 1,
                    nome: "Arroz Branco 5kg",
                    valor: 12.90,
                    descricao: "Arroz branco tipo 1, pacote de 5kg",
                    urlImagem: "https://via.placeholder.com/200x200?text=Arroz",
                    idCategoria: 1,
                    categoria: "Grãos e Cereais"
                },
                {
                    id: 2,
                    nome: "Leite Integral 1L",
                    valor: 4.50,
                    descricao: "Leite integral pasteurizado",
                    urlImagem: "https://via.placeholder.com/200x200?text=Leite",
                    idCategoria: 2,
                    categoria: "Laticínios"
                },
                {
                    id: 3,
                    nome: "Pão de Forma",
                    valor: 6.90,
                    descricao: "Pão de forma integral",
                    urlImagem: "https://via.placeholder.com/200x200?text=Pão",
                    idCategoria: 3,
                    categoria: "Padaria"
                },
                {
                    id: 4,
                    nome: "Banana Prata",
                    valor: 3.90,
                    descricao: "Banana prata por kg",
                    urlImagem: "https://via.placeholder.com/200x200?text=Banana",
                    idCategoria: 4,
                    categoria: "Frutas"
                },
                {
                    id: 5,
                    nome: "Coca-Cola 2L",
                    valor: 7.50,
                    descricao: "Refrigerante Coca-Cola 2 litros",
                    urlImagem: "https://via.placeholder.com/200x200?text=Coca-Cola",
                    idCategoria: 5,
                    categoria: "Bebidas"
                },
                {
                    id: 6,
                    nome: "Frango Congelado",
                    valor: 15.90,
                    descricao: "Peito de frango congelado 1kg",
                    urlImagem: "https://via.placeholder.com/200x200?text=Frango",
                    idCategoria: 6,
                    categoria: "Carnes"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filtrarPorCategoria = (categoriaId) => {
        setCategoriaSelecionada(categoriaId);
    };

    const adicionarAoCarrinho = (produto) => {
        adicionarItem(produto);
        // Mostrar feedback visual (opcional)
        console.log(`${produto.nome} adicionado ao carrinho!`);
    };

    const calcularTotal = () => {
        return itens.reduce((total, item) => total + (item.produto.valor * item.quantidade), 0);
    };

    const produtosFiltrados = categoriaSelecionada 
        ? produtos.filter(produto => produto.idCategoria === parseInt(categoriaSelecionada))
        : produtos;

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border spinner-toledo" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-4">
                {/* Banner promocional */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="bg-toledo-primary text-white rounded p-4">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h3 className="mb-2">
                                        <i className="fas fa-leaf me-2"></i>
                                        Bem-vindo ao Toledo Shop
                                    </h3>
                                    <p className="mb-0">Software completo para gerenciamento de pedidos!</p>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <a href="/novo-pedido" className="btn btn-light btn-lg">
                                        <i className="fas fa-plus me-2"></i>
                                        Novo Pedido
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        {erroApi && (
                            <div className="alert alert-toledo-warning mt-3" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                <strong>Atenção:</strong> Não foi possível conectar com a API. 
                                Exibindo dados de demonstração. Verifique se o backend está rodando.
                            </div>
                        )}
                    </div>
                </div>

            {/* Filtros por categoria */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex flex-wrap gap-2">
                        <button 
                            className={`btn ${categoriaSelecionada === '' ? 'btn-toledo-primary' : 'btn-toledo-outline'}`}
                            onClick={() => filtrarPorCategoria('')}
                        >
                            <i className="fas fa-th me-1"></i>
                            Todos
                        </button>
                        {categorias.map(categoria => (
                            <button 
                                key={categoria.id}
                                className={`btn ${categoriaSelecionada === categoria.id.toString() ? 'btn-toledo-primary' : 'btn-toledo-outline'}`}
                                onClick={() => filtrarPorCategoria(categoria.id.toString())}
                            >
                                {categoria.descricao || categoria.nome}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de produtos */}
            <div className="row">
                {produtosFiltrados.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-toledo-info text-center">
                            <h5>Nenhum produto encontrado</h5>
                            <p>
                                {erroApi 
                                    ? "Não foi possível carregar produtos da API. Exibindo dados de demonstração."
                                    : "Não há produtos disponíveis nesta categoria."
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    produtosFiltrados.map(produto => (
                        <div key={produto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card produto-card h-100">
                                <div className="card-img-container">
                                    <img 
                                        src={produto.urlImagem || 'https://via.placeholder.com/200x200?text=Produto'} 
                                        className="card-img-top" 
                                        alt={produto.nome}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/200x200?text=Produto';
                                        }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text text-muted small flex-grow-1">
                                        {produto.descricao}
                                    </p>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge badge-toledo">{produto.categoria}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 preco-toledo mb-0">
                                                {formatarPreco(produto.valor)}
                                            </span>
                                                        <button
                                                            className="btn btn-toledo-primary btn-sm"
                                                            onClick={() => adicionarAoCarrinho(produto)}
                                                        >
                                                            <i className="fas fa-plus me-1"></i>
                                                            Adicionar
                                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            </div>

            {/* Carrinho Flutuante */}
            {quantidadeTotal > 0 && (
                <div className="carrinho-flutuante">
                    <div className="carrinho-content">
                        <div className="carrinho-header">
                            <h6 className="mb-0">
                                <i className="fas fa-shopping-cart me-2"></i>
                                Carrinho ({quantidadeTotal})
                            </h6>
                        </div>
                        <div className="carrinho-body">
                            {itens.map((item, index) => (
                                <div key={index} className="carrinho-item">
                                    <div className="item-info">
                                        <strong className="small">{item.produto.nome}</strong>
                                        <div className="small text-muted">
                                            {formatarPreco(item.produto.valor)} x {item.quantidade}
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        {formatarPreco(item.produto.valor * item.quantidade)}
                                    </div>
                                </div>
                            ))}
                        </div>
                     <div className="carrinho-footer">
                         <div className="total">
                             <strong>Total: {formatarPreco(calcularTotal())}</strong>
                         </div>
                         <div className="d-grid gap-2">
                             <a
                                 href="/finalizar-pedido"
                                 className="btn btn-toledo-primary btn-sm"
                             >
                                 Finalizar Pedido
                             </a>
                             <button
                                 className="btn btn-outline-danger btn-sm"
                                 onClick={limparCarrinho}
                             >
                                 <i className="fas fa-trash me-1"></i>
                                 Limpar Carrinho
                             </button>
                         </div>
                     </div>
                    </div>
                </div>
            )}
            <CarrinhoSidebar />
        </>
    );
}

export default HomePage;