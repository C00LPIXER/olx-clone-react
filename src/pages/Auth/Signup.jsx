import React, { useState } from "react";
import { signup } from "../../firebase";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const SignupForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { logged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const userCredential = await signup(name.trim(), email.trim(), password);
      const user = userCredential;

      if (user) {
        toast.success("Sign up successfully");
        onClose();
        logged({
          uid: user.uid,
          email: user.email,
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{6,}$/;

    if (!trimmedName || !nameRegex.test(trimmedName)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email";
    }

    if (!trimmedPassword || !passwordRegex.test(trimmedPassword)) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className={`w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            errors.name && "border-red-500 focus:ring-red-500"
          }`}
        />
        {errors.name && (
          <samll className="text-red-500 text-[12px] ">{errors.name}</samll>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            errors.email && "border-red-500 focus:ring-red-500 "
          }`}
        />
        {errors.email && (
          <samll className="text-red-500 text-[12px] ">{errors.email}</samll>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className={`w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            errors.password && "border-red-500 focus:ring-red-500"
          }`}
        />
        {errors.password && (
          <samll className="text-red-500 text-[12px] ">{errors.password}</samll>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#002f34] text-white rounded hover:bg-[rgba(0,47,52,0.9)]"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
