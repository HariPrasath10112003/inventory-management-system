import axios from "axios";

const API = axios.create({
  baseURL: "http://13.61.16.189:8080",
});

export const loginUser = (email, password) =>
  API.post("/auth/login", null, {
    params: { email, password },
  });

export const getProducts = () => API.get("/products");

export const addProduct = (product) => API.post("/products", product);

export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

export const sellProduct = (id, quantity) =>
  API.post(`/products/sell/${id}?quantity=${quantity}`);