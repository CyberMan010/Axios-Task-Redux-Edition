import { useEffect, useState } from "react";
import axios from "./api/axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get("/products");
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {data.map((product) => (
        <div key={product.id} onClick={() => handleProductClick(product.id)}>
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );
}

export default ProductList;