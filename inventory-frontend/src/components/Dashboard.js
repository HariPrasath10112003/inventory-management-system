import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import { getProducts } from "../api";

function Dashboard() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity < 5
  ).length;

  const outOfStock = products.filter(
    (p) => p.quantity === 0
  ).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Inventory Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <div style={cardStyle}>Total Products: {totalProducts}</div>
        <div style={cardStyle}>Total Stock: {totalStock}</div>
        <div style={cardStyle}>Low Stock: {lowStock}</div>
        <div style={cardStyle}>Out of Stock: {outOfStock}</div>
      </div>

      <AddProduct
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        refresh={fetchProducts}
      />

      <ProductList
        setEditingProduct={setEditingProduct}
        refresh={fetchProducts}
      />
    </div>
  );
}

const cardStyle = {
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  width: "200px",
  textAlign: "center",
  fontWeight: "bold"
};

export default Dashboard;