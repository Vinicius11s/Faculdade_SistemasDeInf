import api from "./api.service";
    
export default class AuthService {

    async authenticate (dados) {
        const result = await api.post('/api/Seguranca', dados);

        if(result) {
            localStorage.setItem("acess_token", result.data.access_token);
            localStorage.setItem("usuario", dados.login);
            return true;
        }
        return false;
    }

    usuarioAutenticado () {
        return localStorage.getItem("acess_token") != undefined ? true : false;
    }

    getUsuario () {
        return localStorage.getItem("usuario");
    }

    getToken () {
        return localStorage.getItem("acess_token");
    }
    
    async logout () {
        localStorage.removeItem("acess_token");
        localStorage.removeItem("usuario");
    }
}