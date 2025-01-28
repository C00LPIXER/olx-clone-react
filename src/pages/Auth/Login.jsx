import React, { useState } from "react";
import { login } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginForm = ({ onClose }) => {
  const { logged } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      setLoader(false);
      return;
    }

    setLoader(true);

    try {
      const userCredential = await login(email.trim(), password.trim());
      const user = userCredential.user;

      if (userCredential) {
        toast.success("Login successfully");
        onClose();
      }

      logged({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{6,}$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email";
    }

    if (!trimmedPassword || !passwordRegex.test(trimmedPassword)) {
      newErrors.password = "Enter a valid Password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            errors.email && "border-red-500 focus:ring-red-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loader}
        className={`flex items-center justify-center w-full px-4 py-2 ${
          loader ? "bg-gray-400" : "bg-[#002f34] hover:bg-[rgba(0,47,52,0.9)]"
        } text-white rounded`}
      >
        {loader ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
