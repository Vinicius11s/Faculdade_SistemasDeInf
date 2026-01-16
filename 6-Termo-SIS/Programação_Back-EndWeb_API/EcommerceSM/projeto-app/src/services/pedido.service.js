import api from "./api.service";

export default class PedidoService {

    async selecionar(id) {
        const result = await api.get(`/api/Pedido/${id}`);
        return result;
    }

    async listar() {
        const result = await api.get("/api/Pedido");
        return result;
    }

    async atualizar(dados) {
        const result = await api.put("/api/Pedido", dados);
        return result;
    }

    async salvar(dados) {
        const result = await api.post("/api/Pedido", dados);
        return result;
    }

    async deletar(id) {
        const result = await api.delete(`/api/Pedido/${id}`);
        return result;
    }

    async filtrar(id) {
        const result = await api.get(`/api/Pedido/${id}`);
        return result;
    }

    async atualizarStatus(id, status) {
        const result = await api.patch(`/api/Pedido/${id}/status`, { status });
        return result;
    }

    async buscarPorCliente(clienteId) {
        const result = await api.get(`/api/Pedido/cliente/${clienteId}`);
        return result;
    }

    async buscarPorPeriodo(dataInicio, dataFim) {
        const result = await api.get(`/api/Pedido/periodo?inicio=${dataInicio}&fim=${dataFim}`);
        return result;
    }

    async limparTodos() {
        const result = await api.delete("/api/Pedido/limpar-todos");
        return result;
    }
}



