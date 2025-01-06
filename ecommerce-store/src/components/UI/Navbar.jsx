import React, { useState } from "react";
import axios from "../api/axios";
import CustomButton from "./Button";
import CustomInput from "./Input";

function Navbar({ isAdmin }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
  
    // Add Product
    const handleAddProduct = async () => {
      try {
        const response = await axios.post("/products/", {
          title,
          price: Number(price),
          description,
          categoryId: Number(categoryId),
          images,
        });
        console.log("Product added:", response.data);
        setError(""); // Clear error on success
        setShowAddForm(false); // Hide the form
      } catch (error) {
        console.error("Failed to add product:", error);
        setError("Failed to add product.");
      }
    };
  
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Dar Store</h1>
          <div className="flex space-x-4">
            {/* Regular User Links */}
            <a href="/" className="text-white hover:text-gray-400">
              Home
            </a>
            <a href="/products" className="text-white hover:text-gray-400">
              Products
            </a>
  
            {/* Admin Add Button */}
            {isAdmin && (
              <CustomButton className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group" onClick={() => setShowAddForm(true)}>
                 <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Add Product
              </CustomButton>
            )}
          </div>
        </div>
  
        {/* Add Product Form */}
        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Increased z-index */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <CustomInput
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4"
              />
              <CustomInput
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mb-4"
              />
              <CustomInput
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4"
              />
              <CustomInput
                type="number"
                placeholder="Category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full mb-4"
              />
              <CustomInput
                type="text"
                placeholder="Image URL"
                value={images[0] || ""}
                onChange={(e) => setImages([e.target.value])}
                className="w-full mb-4"
              />
              <div className="flex space-x-4">
                <CustomButton onClick={handleAddProduct}>Add Product</CustomButton>
                <CustomButton onClick={() => setShowAddForm(false)}>
                  Cancel
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
  
  export default Navbar;