import api from "../services/api.service";

export default class FormaPagamentoService {

    async selecionar(id) {
        const result = await api.get(`/api/FormaPagamento/${id}`);
        return result;
    }

    async listar() {
        const result = await api.get("/api/FormaPagamento");
        return result;
    }

    async atualizar(dados) {
        const result = await api.put("/api/FormaPagamento", dados);
        return result;
    }

    async salvar(dados) {
        const result = await api.post("/api/FormaPagamento", dados);
        return result;
    }

    async deletar(id) {
        const result = await api.delete(`/api/FormaPagamento/${id}`);
        return result;
    }

    async filtrar(id) {
        const result = await api.get(`/api/FormaPagamento/${id}`);
        return result;
    }
}

