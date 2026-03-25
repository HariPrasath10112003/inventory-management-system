import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ setEditingProduct }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    fetchProducts();
  };

  const sellProduct = async (id) => {
    const quantity = prompt("Enter quantity to sell:");
    await axios.post(
      `http://localhost:8080/products/sell/${id}?quantity=${quantity}`
    );
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Product List</h3>

      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>

                <button
                  style={{ backgroundColor: "orange", color: "white" }}
                  onClick={() => sellProduct(p.id)}
                >
                  Sell
                </button>

                <button
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => editProduct(p)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;