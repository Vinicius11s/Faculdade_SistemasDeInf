import React, { useState, useEffect } from 'react';
import FormaPagamentoService from '../../services/forma-pagamento.service';
import '../../styles/toledo-shop.css';

const FormasPagamento = () => {
    const [formasPagamento, setFormasPagamento] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        ativo: true
    });

    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const formaPagamentoService = new FormaPagamentoService();

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
            setErro('Erro ao carregar formas de pagamento');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');
        setSucesso('');

        try {
            if (editando) {
                await formaPagamentoService.atualizar({ ...formData, id: idEditando });
                setSucesso('Forma de pagamento atualizada com sucesso!');
            } else {
                await formaPagamentoService.salvar(formData);
                setSucesso('Forma de pagamento cadastrada com sucesso!');
            }

            setFormData({ nome: '', descricao: '', ativo: true });
            setEditando(false);
            setIdEditando(null);
            carregarFormasPagamento();
        } catch (error) {
            console.error('Erro ao salvar forma de pagamento:', error);
            setErro('Erro ao salvar forma de pagamento');
        } finally {
            setLoading(false);
        }
    };

    const handleEditar = (formaPagamento) => {
        setFormData({
            nome: formaPagamento.nome,
            descricao: formaPagamento.descricao,
            ativo: formaPagamento.ativo
        });
        setEditando(true);
        setIdEditando(formaPagamento.id);
    };

    const handleCancelar = () => {
        setFormData({ nome: '', descricao: '', ativo: true });
        setEditando(false);
        setIdEditando(null);
    };

    const handleDeletar = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta forma de pagamento?')) {
            try {
                await formaPagamentoService.deletar(id);
                setSucesso('Forma de pagamento excluída com sucesso!');
                carregarFormasPagamento();
            } catch (error) {
                console.error('Erro ao excluir forma de pagamento:', error);
                setErro('Erro ao excluir forma de pagamento');
            }
        }
    };

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="text-toledo-primary mb-1">
                                    <i className="fas fa-credit-card me-2"></i>
                                    Formas de Pagamento
                                </h2>
                                <p className="text-muted mb-0">Gerencie as formas de pagamento disponíveis</p>
                            </div>
                        </div>

                        {erro && (
                            <div className="alert alert-toledo-danger" role="alert">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {erro}
                            </div>
                        )}

                        {sucesso && (
                            <div className="alert alert-toledo-success" role="alert">
                                <i className="fas fa-check-circle me-2"></i>
                                {sucesso}
                            </div>
                        )}

                        <div className="row">
                            {/* Formulário */}
                            <div className="col-md-4">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-toledo-primary text-white">
                                        <h5 className="mb-0">
                                            <i className="fas fa-plus me-2"></i>
                                            {editando ? 'Editar' : 'Nova'} Forma de Pagamento
                                        </h5>
                                    </div>
                                    <div className="card-body p-3">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="nome" className="form-label-toledo">
                                                    Nome *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-toledo"
                                                    id="nome"
                                                    name="nome"
                                                    value={formData.nome}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="descricao" className="form-label-toledo">
                                                    Descrição
                                                </label>
                                                <textarea
                                                    className="form-control form-control-toledo"
                                                    id="descricao"
                                                    name="descricao"
                                                    value={formData.descricao}
                                                    onChange={handleChange}
                                                    rows="3"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="ativo"
                                                        name="ativo"
                                                        checked={formData.ativo}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="ativo">
                                                        Ativo
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="d-grid gap-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-toledo-primary"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Salvando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-save me-2"></i>
                                                            {editando ? 'Atualizar' : 'Salvar'}
                                                        </>
                                                    )}
                                                </button>

                                                {editando && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-toledo-outline"
                                                        onClick={handleCancelar}
                                                    >
                                                        <i className="fas fa-times me-2"></i>
                                                        Cancelar
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Lista */}
                            <div className="col-md-8">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-light">
                                        <h5 className="mb-0">
                                            <i className="fas fa-list me-2"></i>
                                            Formas de Pagamento Cadastradas
                                        </h5>
                                    </div>
                                    <div className="card-body p-0">
                                        {loading ? (
                                            <div className="text-center py-4">
                                                <div className="spinner-border spinner-toledo" role="status">
                                                    <span className="visually-hidden">Carregando...</span>
                                                </div>
                                            </div>
                                        ) : formasPagamento.length === 0 ? (
                                            <div className="text-center py-4">
                                                <i className="fas fa-credit-card fa-3x text-muted mb-3"></i>
                                                <h6 className="text-muted">Nenhuma forma de pagamento cadastrada</h6>
                                                <p className="text-muted small">Adicione uma nova forma de pagamento</p>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover mb-0">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>Nome</th>
                                                            <th>Descrição</th>
                                                            <th>Status</th>
                                                            <th width="120">Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formasPagamento.map(forma => (
                                                            <tr key={forma.id}>
                                                                <td>
                                                                    <strong>{forma.nome}</strong>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">
                                                                        {forma.descricao || '-'}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className={`badge ${forma.ativo ? 'bg-success' : 'bg-secondary'}`}>
                                                                        {forma.ativo ? 'Ativo' : 'Inativo'}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group btn-group-sm">
                                                                        <button
                                                                            className="btn btn-outline-primary"
                                                                            onClick={() => handleEditar(forma)}
                                                            title="Editar"
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-outline-danger"
                                                                            onClick={() => handleDeletar(forma.id)}
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormasPagamento;
