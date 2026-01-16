import { useState, useEffect } from "react";

function CategoriaPage() {

    const [ categorias, setCategorias ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCadastrar = () => {
    }

    const handleAlterar = (id) => {
    }

    const handleDeletar = async (id) => {
    }

    async function listar() {
    }

    useEffect(() => {
    }, []); // executa apenas uma vez, ao carregar

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">LISTAGEM DE CATEGORIA</h4>
    
                <button
                    type="button"
                    onClick={handleCadastrar}
                    className="btn btn-success btn-sm"
                >
                    + Novo
                </button>
            </div>

            { categorias.length === 0 ? (
                <p className="text-muted text-center m-0 mt-4"> Nenhuma categoria cadastrada.</p>
            
            ) : (

                <table class="table mt-4">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Descrição Avançada</th>
                        <th scope="col" className="text-end">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <th scope="row">{categoria.id}</th>
                                <td>{categoria.descricao}</td>
                                <td>{categoria.descricaoDetalhada || "-"}</td>
                                <td className="text-end">
                                    <button
                                        type="button"
                                        onClick={() => handleAlterar(categoria.id)}
                                        className="btn btn-sm btn-primary me-2"
                                    >
                                        <i className="bi bi-pencil-square"></i> Alterar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeletar(categoria.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        <i className="bi bi-trash"></i> Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    );  
}

export default CategoriaPage;