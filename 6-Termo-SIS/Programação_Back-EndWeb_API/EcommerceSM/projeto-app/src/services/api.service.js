import axios from "axios";

function getToken() {
    return localStorage.getItem("acess_token");
}
    
const api = axios.create({
  baseURL: "https://localhost:7101",
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;