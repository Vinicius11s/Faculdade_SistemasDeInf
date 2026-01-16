import api from "../services/api.service";

export default class ClienteService {

    async selecionar(id) {
        const result = await api.get(`/api/Cliente/${id}`);
        return result;
    }

    async listar() {
        const result = await api.get("/api/Cliente");
        return result;
    }

    async atualizar(dados) {
        const result = await api.put("/api/Cliente", dados);
        return result;
    }

    async salvar(dados) {
        const result = await api.post("/api/Cliente", dados);
        return result;
    }

    async deletar(id) {
        const result = await api.delete(`/api/Cliente/${id}`);
        return result;
    }

    async filtrar(id) {
        const result = await api.get(`/api/Cliente/${id}`);
        return result;
    }
}

