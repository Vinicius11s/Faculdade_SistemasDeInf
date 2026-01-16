import api from "./api.service";

export default class CategoriaService {

    async selecionar (id) {
    }

    async listar () {
        //acessando endPoint
        const result = await api.get("/api/Categoria");
        return result;
    }

    async atualizar (dados) {
        const result = api.put("/api/Categoria", dados);
        return result;
    }

    async salvar (dados) {
        const result = api.post("/api/Categoria", dados);
        return result;
    }

     async deletar (id) {
        const result = api.delete(`/api/Categoria/${id}`);
        return result;
    }

    async filtrar (id) {
        const result = api.get(`/api/Categoria/${id}`);
        return result;
        //ir para projeto da aula e implementar a page>categoriapage
    }
}