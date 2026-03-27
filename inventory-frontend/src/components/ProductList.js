import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, sellProduct } from "../api";

function ProductList({ setEditingProduct, refresh }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
    refresh();
  };

  const handleSell = async (id) => {
    const quantity = prompt("Enter quantity to sell:");
    if (!quantity) return;
    await sellProduct(id, quantity);
    fetchProducts();
    refresh();
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
                <button onClick={() => handleDelete(p.id)}>Delete</button>
                <button onClick={() => handleSell(p.id)}>Sell</button>
                <button onClick={() => editProduct(p)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;