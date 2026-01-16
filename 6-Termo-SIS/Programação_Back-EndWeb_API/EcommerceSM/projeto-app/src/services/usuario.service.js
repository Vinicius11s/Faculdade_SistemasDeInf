import api from "./api.service";

export default class UsuarioService {

    async selecionar(id) {
        const result = await api.get(`/api/Usuario/${id}`);
        return result;
    }

    async listar() {
        const result = await api.get("/api/Usuario");
        return result;
    }

    async atualizar(dados) {
        const result = await api.put("/api/Usuario", dados);
        return result;
    }

    async salvar(dados) {
        const result = await api.post("/api/Usuario", dados);
        return result;
    }

    async deletar(id) {
        const result = await api.delete(`/api/Usuario/${id}`);
        return result;
    }

    async filtrar(id) {
        const result = await api.get(`/api/Usuario/${id}`);
        return result;
    }

    async buscarPorNome(nome) {
        const result = await api.get(`/api/Usuario/buscar?nome=${nome}`);
        return result;
    }

    async alterarSenha(id, senhaAtual, novaSenha) {
        const result = await api.patch(`/api/Usuario/${id}/senha`, {
            senhaAtual,
            novaSenha
        });
        return result;
    }

    async ativarDesativar(id) {
        const result = await api.patch(`/api/Usuario/${id}/status`);
        return result;
    }
}




