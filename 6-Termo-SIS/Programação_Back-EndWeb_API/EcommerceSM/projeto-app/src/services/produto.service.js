import api from "./api.service";

export default class ProdutoService {

    async selecionar(id) {
        const result = await api.get(`/api/Produto/${id}`);
        return result;
    }

    async listar() {
        //acessando endPoint
        const result = await api.get("/api/Produto");
        return result;
    }

    async atualizar(dados) {
        const result = await api.put("/api/Produto", dados);
        return result;
    }

    async salvar(dados) {
        const result = await api.post("/api/Produto", dados);
        return result;
    }

    async deletar(id) {
        const result = await api.delete(`/api/Produto/${id}`);
        return result;
    }

    async filtrar(id) {
        const result = await api.get(`/api/Produto/${id}`);
        return result;
    }

    async buscarPorCategoria(categoriaId) {
        const result = await api.get(`/api/Produto/categoria/${categoriaId}`);
        return result;
    }
}

