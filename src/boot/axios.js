import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:9001/api";

// Interceptador para adicionar o token de autorização no cabeçalho
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

Vue.prototype.$axios = axios
