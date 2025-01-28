import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown, IoIosHeartEmpty } from "react-icons/io";
import { MdMyLocation, MdLocationPin } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { FaPlus } from "react-icons/fa";
import AuthModal from "../../pages/Auth/Auth";
import { Link } from "react-router-dom";

const keyword = ["Jobs", "Cars", "Properties", "Mobiles", "Bikes"];

const Navbar = () => {
  const [arrow, setArrow] = useState("down");
  const [array, setArray] = useState(keyword);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const { user, login, logout } = useAuth();

  const loginBtnSwitch = () => {
    setModalType(modalType === "login" ? "signup" : "login");
  };

  const handleLogout = () => {
    logout();
  };

  const handleSwitch = () => {
    setModalType(modalType === "login" ? "signup" : "login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % array.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [array.length]);

  return (
    <>
      <div className="navbar z-1 relative border-6 border-l-0 border-t-0 border-r-0 border-b-[#ffffff] shadow">
        <Link to="/">
          <svg
            width="56px"
            height="56px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            className=""
            fillRule="evenodd"
          >
            <path
              className="rui-w4DG7"
              d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
              fill="#002f34"
            ></path>
          </svg>
        </Link>
        <div className="relative">
          <div className="bg-[#ffff] mx-5 px-3 w-[272px] h-[48px] flex items-center justify-between border-2 border-[#002f34] rounded">
            <IoSearchOutline size={24} color="#002f34" />
            <div>India</div>
            <div
              onClick={() => {
                setArrow(arrow === "down" ? "up" : "down");
                setIsOpen(!isOpen);
              }}
            >
              {arrow === "down" ? (
                <IoIosArrowDown size={24} color="#002f34" />
              ) : (
                <IoIosArrowUp size={24} color="#002f34" />
              )}
            </div>
          </div>

          {isOpen && (
            <div className="right-5 absolute mt-1 w-[272px] bg-white border border-[#d8d8d8] rounded shadow-lg z-10">
              <div className="flex items-center justify-around">
                <div className="flex items-center space-x-4 py-3">
                  <MdMyLocation className="pl-4 text-blue-500" size={45} />
                  <p className="text-blue-500">
                    <span className="font-bold">Use current location</span>
                    <br />
                    Location blocked. Check browser/phone settings.
                  </p>
                </div>
              </div>

              <hr style={{ borderColor: "#d8d8d8" }} />
              <ul className="space-y-2">
                <li className="flex items-center px-4 py-2 hover:bg-[#f1f1f1]">
                  <span>
                    <MdLocationPin size={20} />
                  </span>
                  <span className="ml-2">Kerala</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-[#f1f1f1]">
                  <span>
                    <MdLocationPin size={20} />
                  </span>
                  <span className="ml-2">Tamil Nadu</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-[#f1f1f1]">
                  <span>
                    <MdLocationPin size={20} />
                  </span>
                  <span className="ml-2">Punjab</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-[#f1f1f1]">
                  <span>
                    <MdLocationPin size={20} />
                  </span>
                  <span className="ml-2">Maharashtra</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-2/3  bg-[#ffff] h-[48px] flex items-center justify-between border-2 border-[#002f34] rounded overflow-hidden">
          <input
            className="w-2/3 px-4 border-none focus:outline-none focus:ring-0"
            type="text"
            placeholder={`Search "${array[currentIndex]}"`}
          />
          <div className="bg-[#003F34] w-[48px] h-[48px] flex items-center justify-center relative">
            <IoSearchOutline size={24} color="#ffffff" />
          </div>
        </div>
        <div className="relative flex items-center space-x-2">
          <select
            id="language"
            className="mx-2 w-27 border-0 px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-0"
          >
            <option value="en">English</option>
            <option value="es">हिंदी</option>
          </select>
        </div>

        <IoIosHeartEmpty className="mx-4  w-8" size={24} />
        {user ? (
          <h2
            onClick={handleLogout}
            className="font-bold text-[#780000] px-7 py-2 rounded cursor-pointer"
          >
            Logout
          </h2>
        ) : (
          <h2
            onClick={() => setIsModal(true)}
            className="font-bold px-7 py-2 rounded cursor-pointer"
          >
            Login
          </h2>
        )}
        {user && (
          <Link to="/sell">
            <button className="bg-white flex items-center justify-between border-6 rounded-full  w-28 border-r-[#3B77FE] border-t-[#23E4DA] border-b-[#FFCF33] border-l-[#FFCF33] py-1 px-5 cursor-pointer">
              <FaPlus /> <span className="font-medium">Sell</span>
            </button>
          </Link>
        )}
      </div>
      <div className="relative px-15 pt-16 flex items-center w-[100%] h-27 shadow">
        <select className="font-bold">
          <option value="All Categories">All Categories</option>
          <option value="">Motorcycles</option>
          <option value="">Scooters </option>
          <option value="">Spare Parts</option>
          <option value="">Mobile Phones</option>
        </select>
        <ul className="relative px-12 flex justify-between w-6/2">
          <label htmlFor="">Cars</label>
          <label htmlFor="">Motorcycles</label>
          <label htmlFor="">Mobile Phones</label>
          <label htmlFor="">For Sale: Houses & Apartments</label>
          <label htmlFor="">Scooters</label>
          <label htmlFor="">Commercial & Other Vehicles</label>
          <label htmlFor="">For Rent: Houses & Apartments</label>
        </ul>
      </div>
      <AuthModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        type={modalType}
        onSwitch={handleSwitch}
      />
    </>
  );
};

export default Navbar;
