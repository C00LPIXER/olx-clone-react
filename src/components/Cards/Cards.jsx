import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { getAllProducts } from "../../firebase";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    displayProducts();
  }, []);

  const displayProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);  
    }
  };

  if (loading) {
    return (
      <div className="h-[71vh] w-full flex items-center justify-center">
        <div className="w-8 h-8 border-t-4 border-[#002f34] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] mx-25 my-10">
      <h1 className="text-2xl font-medium">Fresh recommendations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <Link to={`product/${product.id}`} key={product.id}>
            <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg">
              <div className="relative">
                <img
                  src={product.image || "default-image-url.jpg"} // Fallback for missing image
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:shadow-md">
                  <AiOutlineHeart
                    size={24}
                    className="text-gray-500 hover:text-red-500"
                  />
                </button>
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-bold text-gray-800">
                  ₹ {product.price}
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  {product.title}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm">{product.location}</p>
                  <p className="text-gray-600 text-sm">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
