import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { addProduct } from "../../firebase";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { uploadToCloudinary } from "../../cloudinary";
import { useNavigate } from "react-router-dom";

const SellProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const user = useAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    image: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    const titleRegex = /^[a-zA-Z0-9 ]{3,}$/;
    if (!title || !titleRegex.test(title)) {
      newErrors.title =
        "Title is required and contain only letters, numbers, or spaces.";
      valid = false;
    }

    const descriptionRegex = /^.{10,}$/;
    if (!description || !descriptionRegex.test(description)) {
      newErrors.description =
        "Description must be at least 10 characters long.";
      valid = false;
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!price || !priceRegex.test(price) || price <= 0) {
      newErrors.price =
        "Price must be a positive number, up to two decimal places.";
      valid = false;
    }

    const categoryRegex = /^[a-zA-Z0-9 ]+$/;
    if (!category || !categoryRegex.test(category)) {
      newErrors.category = "Category is required and must be valid.";
      valid = false;
    }

    const locationRegex = /^[a-zA-Z0-9 ,.-]+$/;
    if (!location || !locationRegex.test(location)) {
      newErrors.location = "Location is required and must be valid.";
      valid = false;
    }

    const validImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"];
    if (!image || !validImageTypes.includes(image.type)) {
      newErrors.image = "Valid image file of type .png, .jpg or .webp is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setLoader(false);
      return;
    }

    setLoader(true);

    try {
      const imageUrl = await uploadToCloudinary(image);
      console.log(imageUrl);

      await addProduct(
        title,
        description,
        category,
        price,
        user.user.email,
        imageUrl,
        location
      );

      toast.success("New Product added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[85vh] flex items-center justify-center">
        <form
          className="relative border-2 rounded p-10 w-full max-w-4xl"
          onSubmit={handleSubmit}
        >
          <div className="flex space-x-8">
            <div className="space-y-4 w-1/2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  id="title"
                  placeholder="Enter your title"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.title}</small>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description"
                  placeholder="Enter your description"
                  className="w-full h-32 mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.description}</small>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  id="price"
                  placeholder="Enter your price"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.price}</small>
              </div>
            </div>
            <div className="space-y-4 w-1/2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="Enter your category"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.category}</small>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.location}</small>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                />
                <small className="text-red-500">{errors.image}</small>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preview
                </label>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-40 object-cover border rounded mt-2"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={loader}
                className={`flex items-center justify-center w-full px-4 py-2 ${
                  loader
                    ? "bg-gray-400"
                    : "bg-[#002f34] hover:bg-[rgba(0,47,52,0.9)]"
                } text-white rounded`}
              >
                {loader ? "Loading..." : "Sell"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SellProduct;
