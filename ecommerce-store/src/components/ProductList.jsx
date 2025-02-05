import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, updateProduct } from "../store/features/productsSlice"; 
import ProductCard from "./ProductCard";

function ProductList({ isAdmin }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (updatedProduct) => {
    dispatch(updateProduct({ id: updatedProduct.id, updatedProduct }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          isAdmin={isAdmin} 
        />
      ))}
    </div>
  );
}

export default ProductList;