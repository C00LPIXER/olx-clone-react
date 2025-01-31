import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getProductById } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
  }, []);

  const getProduct = async (id) => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {product ? (
        <div className="min-h-[100vh] pb-25 bg-[#eff0f2]">
          <nav
            className="flex p-4 bg-gray-100 rounded-md"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center">
                  <Link
                    to={"/"}
                    className="text-gray-700 hover:text-[#002f34] inline-flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 2L2 8h2v8h4V12h4v4h4V8h2L10 2z" />
                    </svg>
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <MdKeyboardArrowRight />
                  <p className="ps-2 text-gray-700 hover:text-[#002f34]">
                    {product.category}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <MdKeyboardArrowRight />
                  <p className="ps-2 text-gray-700 hover:text-[#002f34]">
                    {product.title}
                  </p>
                </div>
              </li>
            </ol>
          </nav>
          <div className="m-24 mt-10 mb-0">
            <div className="flex items-center justify-between px-6 w-[100%] h-100 overflow-hidden bg-[#000]">
              <IoIosArrowBack size={30} color="white" />
              <img className="h-150" src={product.image} alt="" />
              <IoIosArrowForward size={30} color="white" />
            </div>

            <div className="mt-10 w-[100%] flex justify-around">
              <div className="w-3/5 min-h-11 bg-white rounded p-4">
                <h1 className="font-bold text-[#002f34] text-3xl ">
                  {product.title}
                </h1>
                <p className="pt-6 text-xl">{product.category}</p>
                <p>
                  <span className="font-medium text-[#002f349d]">
                    Location:
                  </span>{" "}
                  {product.location}
                </p>
              </div>

              <div className="w-1/3 min-h-11 bg-white rounded p-4">
                <h1 className="font-bold text-[#002f34] text-5xl">
                  ₹ {product.price}
                </h1>
                <button className="mt-3 w-[100%] h-12 bg-[#002f34] font-extrabold text-white rounded border-6 border-[#002f34] hover:bg-white hover:text-[#002f34]">
                  Make Offer
                </button>
              </div>
            </div>
            <div className="mt-10 w-[100%] flex justify-around">
              <div className="w-3/5 min-h-11 bg-white rounded p-4">
                <h1 className="font-bold pb-3 text-[#002f3485] text-3xl ">
                  Description
                </h1>
                <hr />

                <p className="pt-4 font-medium text-[#0015179f]">
                  {product.description}
                </p>
              </div>

              <div className="w-1/3 h-40 bg-white rounded p-4">
                <h1 className="font-bold text-[#002f34] text-2xl flex items-center">
                  <BiSolidUserRectangle size={60} className="pe-3" />{" "}
                  {product.userMail}
                </h1>
                <button className="mt-3 w-[100%] h-12 bg-[#fff] font-extrabold text-[#002f34] rounded border-3 border-[#002f34] hover:bg-[#002f34] hover:text-[#ffff]">
                  Chat with seller
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[70vh] w-[100%] flex items-center justify-center">
          <div className="w-8 h-8 border-t-4 border-[#002f34] border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;
