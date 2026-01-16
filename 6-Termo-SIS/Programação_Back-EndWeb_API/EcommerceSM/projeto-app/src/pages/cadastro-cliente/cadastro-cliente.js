import React, { useState } from 'react';
import ClienteService from '../../services/cliente.service';
import '../../styles/toledo-shop.css';

const CadastroCliente = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        senha: '',
        confirmarSenha: ''
    });

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const clienteService = new ClienteService();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');
        setSucesso('');

        // Validações básicas
        if (formData.senha !== formData.confirmarSenha) {
            setErro('As senhas não coincidem');
            setLoading(false);
            return;
        }

        if (formData.senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            // Preparar dados para envio (remover confirmarSenha)
            const { confirmarSenha, ...dadosCliente } = formData;
            
            const response = await clienteService.salvar(dadosCliente);
            
            if (response.status === 200 || response.status === 201) {
                setSucesso('Cliente cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    cpf: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                    senha: '',
                    confirmarSenha: ''
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            setErro('Erro ao cadastrar cliente. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const formatarCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const formatarTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
    };

    const formatarCEP = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2');
    };

    const handleCPFChange = (e) => {
        const formatted = formatarCPF(e.target.value);
        setFormData(prev => ({ ...prev, cpf: formatted }));
    };

    const handleTelefoneChange = (e) => {
        const formatted = formatarTelefone(e.target.value);
        setFormData(prev => ({ ...prev, telefone: formatted }));
    };

    const handleCEPChange = (e) => {
        const formatted = formatarCEP(e.target.value);
        setFormData(prev => ({ ...prev, cep: formatted }));
    };

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-toledo-primary text-white text-center py-3">
                                <h4 className="mb-0">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Cadastro de Cliente
                                </h4>
                                <p className="mb-0 small">Crie sua conta no Toledo Shop</p>
                            </div>
                            
                            <div className="card-body p-4">
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

                                <form onSubmit={handleSubmit}>
                                    {/* Informações pessoais */}
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <h6 className="text-toledo-primary mb-3">
                                                <i className="fas fa-user me-2"></i>
                                                Informações Pessoais
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="nome" className="form-label-toledo">
                                                Nome Completo *
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
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label-toledo">
                                                E-mail *
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-toledo"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="telefone" className="form-label-toledo">
                                                Telefone *
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-toledo"
                                                id="telefone"
                                                name="telefone"
                                                value={formData.telefone}
                                                onChange={handleTelefoneChange}
                                                placeholder="(11) 99999-9999"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="cpf" className="form-label-toledo">
                                                CPF *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-toledo"
                                                id="cpf"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleCPFChange}
                                                placeholder="000.000.000-00"
                                                maxLength="14"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Endereço */}
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <h6 className="text-toledo-primary mb-3">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                Endereço
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-8">
                                            <label htmlFor="endereco" className="form-label-toledo">
                                                Endereço *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-toledo"
                                                id="endereco"
                                                name="endereco"
                                                value={formData.endereco}
                                                onChange={handleChange}
                                                placeholder="Rua, número, bairro"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="cep" className="form-label-toledo">
                                                CEP *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-toledo"
                                                id="cep"
                                                name="cep"
                                                value={formData.cep}
                                                onChange={handleCEPChange}
                                                placeholder="00000-000"
                                                maxLength="9"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cidade" className="form-label-toledo">
                                                Cidade *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-toledo"
                                                id="cidade"
                                                name="cidade"
                                                value={formData.cidade}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="estado" className="form-label-toledo">
                                                Estado *
                                            </label>
                                            <select
                                                className="form-control form-control-toledo"
                                                id="estado"
                                                name="estado"
                                                value={formData.estado}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Selecione o estado</option>
                                                <option value="SP">São Paulo</option>
                                                <option value="RJ">Rio de Janeiro</option>
                                                <option value="MG">Minas Gerais</option>
                                                <option value="RS">Rio Grande do Sul</option>
                                                <option value="PR">Paraná</option>
                                                <option value="SC">Santa Catarina</option>
                                                <option value="BA">Bahia</option>
                                                <option value="GO">Goiás</option>
                                                <option value="PE">Pernambuco</option>
                                                <option value="CE">Ceará</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Senha */}
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h6 className="text-toledo-primary mb-3">
                                                <i className="fas fa-lock me-2"></i>
                                                Segurança
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="senha" className="form-label-toledo">
                                                Senha *
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-toledo"
                                                id="senha"
                                                name="senha"
                                                value={formData.senha}
                                                onChange={handleChange}
                                                minLength="6"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="confirmarSenha" className="form-label-toledo">
                                                Confirmar Senha *
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-toledo"
                                                id="confirmarSenha"
                                                name="confirmarSenha"
                                                value={formData.confirmarSenha}
                                                onChange={handleChange}
                                                minLength="6"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-toledo-primary btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Cadastrando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-user-plus me-2"></i>
                                                    Criar Conta
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center mt-3">
                                        <p className="text-muted small">
                                            Já tem uma conta? 
                                            <a href="#login" className="text-toledo-primary ms-1">
                                                Faça login aqui
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CadastroCliente;
