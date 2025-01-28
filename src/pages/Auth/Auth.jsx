import React from "react";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import { login, signup } from "../../firebase";

const AuthModal = ({ isOpen, onClose, type, onSwitch }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#40404045] bg-opacity-50">
      <div className="relative bg-white w-95 rounded shadow-lg p-6 h-150">
        <div className="flex items-center justify-center">
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
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-center text-xl font-bold">
            {type === "login" ? "Login" : "Sign Up"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>

        <div className="mt-4">
          {type === "login" ? <LoginForm onClose={onClose} /> : <SignupForm onClose={onClose} />}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
        <div className="absolute start-0 bottom-5 w-full text-center text-sm text-gray-600">
          <p className="text-sm">All your personal details are safe with us.</p>
          <small>
            If you continue, you are accepting
            <span className="text-blue-500">
              {" "}
              OLX Terms <br />
              and Conditions and Privacy Policy
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
