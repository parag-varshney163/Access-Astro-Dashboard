import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import ROUTES from "../constants/Routes";
import colors from "../constants/colors";
import logo from "../assets/logo.webp";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/api/v1/admin/login", {
        email,
        password,
      });
      const token = data?.data?.accessToken;
     
      if (!token) throw new Error("Token missing from response");

      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(data.data.admin));

      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
      style={{ background: colors.gradientVertical }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0f1424]/70 backdrop-blur-md rounded-2xl p-10 w-[420px] shadow-2xl relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="ChatSpark" width={90} height={90} />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">
          Chat<span style={{ color: colors.accent }}>Spark</span>
        </h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block mb-2 text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ backgroundColor: colors.inputBg }}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="block mb-2 text-sm text-gray-300">Password</label>
          <input
            type="password"
            className="w-full mb-2 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ backgroundColor: colors.inputBg }}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password (left-aligned) */}
          <div className="mb-4 text-left">
            <Link
              to={ROUTES.RESET_PASSWORD}
              style={{ color: colors.accent }}
              className="text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-center mb-3">{error}</p>}

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 font-semibold px-8 py-3 rounded-full shadow-lg"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.textPrimary,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : (
              <>
                <LogIn size={18} /> Log In
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
