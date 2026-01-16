import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoriaCadastroPage() {

    const { id } = useParams(); // Pega o id da URL
    
    const [descricao, setDescricao] = useState("");
    const [descricaoDetalhada, setDescricaoDetalhada] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [modoEdicao, setModoEdicao] = useState(false);

    const validarFormulario = () => {
        if (!descricao || descricao.trim().length === 0) {
            setError("O campo 'Descrição' é obrigatório.");
            return false;
        }

        if (descricao.length > 100) {
            setError("A 'Descrição' deve ter no máximo 100 caracteres.");
            return false;
        }
        
        if (descricaoDetalhada.length > 1000) {
            setError("A 'Descrição detalhada' deve ter no máximo 1000 caracteres.");
            return false;
        }

        setError(null);
        return true;
    };

    const limparDados = () => {
        setDescricao("");
        setDescricaoDetalhada("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();   
    };

    async function carregarCategoria() {
    }

    // Só carrega a categoria 1x, quando o ID existir
    useEffect(() => {
    }, [id]); // só depende do id

    return (

        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                    {modoEdicao ? "EDITAR CATEGORIA" : "CADASTRAR CATEGORIA"}
                </h4>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {successMsg && (
                <div className="alert alert-success" role="alert">
                    {successMsg}
                </div>
            )}

            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">
                        Descrição *
                    </label>
                    <input
                        id="descricao"
                        type="text"
                        className="form-control"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite o nome da categoria"
                        maxLength={100}
                        required
                    />
                    <div className="form-text">
                        Obrigatório. Máx. 100 caracteres.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="descricaoDetalhada" className="form-label">
                        Descrição detalhada
                    </label>

                    <textarea
                        id="descricaoDetalhada"
                        className="form-control"
                        value={descricaoDetalhada}
                        onChange={(e) => setDescricaoDetalhada(e.target.value)}
                        placeholder="Descrição completa (opcional)"
                        rows={4}
                        maxLength={1000}
                    />
                    <div className="form-text">
                        Opcional. Máx. 1000 caracteres.
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading
                        ? "Salvando..."
                        : modoEdicao
                        ? "Salvar Alterações"
                        : "Cadastrar"}
                </button>
            </form>
        </div>
   
    );
    
}

export default CategoriaCadastroPage;