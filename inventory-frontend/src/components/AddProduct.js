import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct({ editingProduct, setEditingProduct, refresh }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        // UPDATE
        await axios.put(
          `http://localhost:8080/products/${editingProduct.id}`,
          product
        );
        alert("Product Updated");
        setEditingProduct(null);
      } else {
        // ADD
        await axios.post("http://localhost:8080/products", product);
        alert("Product Added");
      }

      setProduct({ name: "", price: "", quantity: "", category: "" });
      refresh(); // reload list
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

      <input name="name" value={product.name} placeholder="Name" onChange={handleChange} />
      <br /><br />

      <input name="price" value={product.price} placeholder="Price" onChange={handleChange} />
      <br /><br />

      <input name="quantity" value={product.quantity} placeholder="Quantity" onChange={handleChange} />
      <br /><br />

      <input name="category" value={product.category} placeholder="Category" onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>
        {editingProduct ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default AddProduct;