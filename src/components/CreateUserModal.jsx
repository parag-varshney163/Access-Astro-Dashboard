import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


export default function CreateUserModal({ isOpen, onClose,onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
const [loadingRoles, setLoadingRoles] = useState(false);

useEffect(() => {
  fetchRoles();
}, []);

const fetchRoles = async () => {
  try {
    setLoadingRoles(true);
    const res = await axiosInstance.get("/api/v1/access-dashboard/roles-with-count"); // Replace with your roles API endpoint
    const rolesData = res.data?.data?.roles || [];
    setRoles(rolesData.map(role => role.roleName)); // extract roleName
  } catch (err) {
    console.error("Failed to fetch roles", err);
  } finally {
    setLoadingRoles(false);
  }
};


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    department: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
        department: formData.department,
      };

      const res = await axiosInstance.post("/api/v1/access-dashboard/admin/create", payload);

      if (res.data?.success) {
        alert(res.data.message || "User created successfully!");

        setFormData({
          fullName: "",
          email: "",
          role: "",
          department: "",
        });
        onSubmit();
        onClose();
      } else {
        alert(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create user. Please try again.");
    }

    setLoading(false);
  };




  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#00000088",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: "700px",
            backgroundColor: colors.secondary,
            borderRadius: "12px",
            padding: "32px",
            border: `1px solid ${colors.cardBorder}`,
            color: colors.textPrimary,
            boxShadow: "0 0 30px #00000055",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: colors.textPrimary,
              }}
            >
              Create New User Account
            </h2>

            <X
              size={26}
              onClick={onClose}
              style={{
                cursor: "pointer",
                color: colors.textPrimary,
              }}
            />
          </div>

          <p
            style={{
              color: colors.textSecondary,
              marginBottom: "20px",
              fontSize: "16px",
            }}
          >
            Fill in the details to create a new user account with role-based
            access
          </p>

          {/* FORM GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Full Name */}
            <InputField
              label="Full Name"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            {/* Email */}
            <InputField
              label="Email Address"
              placeholder="user@hangoutclub.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Role Dropdown */}
            <SelectField
  label="Role"
  options={loadingRoles ? ["Loading roles..."] : roles}
  value={formData.role}
  onChange={(e) =>
    setFormData({ ...formData, role: e.target.value })
  }
/>


            {/* Department */}
            <InputField
              label="Department"
              placeholder="e.g., Operations, Support"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "28px",
              backgroundColor: loading ? colors.accent + "88" : colors.accent,
              color: colors.primary,
              padding: "15px 0",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              border: "none",
            }}
          >
            {loading ? "Creating User..." : "Generate Account Credentials"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------
   Reusable Input Field Component
--------------------------------------------------*/
function InputField({ label, placeholder, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontSize: "16px",
          marginBottom: "8px",
          color: colors.textPrimary,
          fontWeight: "500",
        }}
      >
        {label}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: colors.inputBg,
          color: colors.textPrimary,
          border: `2px solid ${colors.accent}`,
          borderRadius: "8px",
          padding: "14px",
          outline: "none",
          fontSize: "15px",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------
   Reusable Select Field Component
--------------------------------------------------*/
function SelectField({ label, options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontSize: "16px",
          marginBottom: "8px",
          color: colors.textPrimary,
          fontWeight: "500",
        }}
      >
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: colors.inputBg,
          color: colors.textPrimary,
          border: `2px solid ${colors.cardBorder}`,
          borderRadius: "8px",
          padding: "14px",
          fontSize: "15px",
          outline: "none",
        }}
      >
        <option value="">Select role</option>
        {options.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
