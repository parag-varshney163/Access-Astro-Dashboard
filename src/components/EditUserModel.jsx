import React, { useEffect, useState, useRef } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


export default function EditUserModal({
  isOpen,
  onClose,
  userData,
  onSubmit,
}) {
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "",
  });
  const [roles, setRoles] = useState([]);
const [loadingRoles, setLoadingRoles] = useState(false);

const fetchRoles = async () => {
  try {
    setLoadingRoles(true);

    const res = await axiosInstance.get(
      "/api/v1/access-dashboard/roles-with-count"
    );

    const rolesData = res.data?.data?.roles || [];

    setRoles(rolesData.map((role) => role.roleName)); // ✅ extract roleName
  } catch (err) {
    console.error("Failed to fetch roles", err);
  } finally {
    setLoadingRoles(false);
  }
};
useEffect(() => {
  if (isOpen) {
    fetchRoles(); // ✅ call when modal opens
  }
}, [isOpen]);

  // local UI: dashboard section toggle
  const [expanded, setExpanded] = useState({});

  // scroll lock and unlock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  // Initialize form values when modal opens
  useEffect(() => {
    if (!userData) return;

    setFormData({
      //  userId:userData.userId ||"", 
      name: userData.name || "",
      email: userData.email || "",
      role: roles.includes(userData?.role) ? userData?.role : "",
      department: userData.department || "",
      status: userData.status || "active",
      // dashboards: userData.dashboards || [],
    });
  }, [userData,roles]);

  if (!isOpen) return null;

  const handleClose = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  const toggleDashboard = (name) => {
    setFormData((prev) => ({
      ...prev,
      dashboards: prev.dashboards.includes(name)
        ? prev.dashboards.filter((d) => d !== name)
        : [...prev.dashboards, name],
    }));
  };

  const DASHBOARD_SECTIONS = [
    "Moderation and Customer Support Dashboard",
    "Operations Dashboard",
    "Creator Onboarding and Payouts Dashboard",
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-50 p-6"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        className="w-full max-w-3xl rounded-2xl shadow-xl p-8 relative overflow-auto"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          maxHeight: "90vh",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-6"
          style={{ color: colors.textPrimary }}
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: colors.textPrimary }}
        >
          Edit User Account
        </h2>
        <p className="mb-6 text-sm" style={{ color: colors.textSecondary }}>
          Update user details and access permissions
        </p>

        {/* USER ID BLOCK */}
        <div
          className="w-full p-4 rounded-xl mb-6"
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <p className="text-xs opacity-70">User Id</p>
          <p className="text-md font-semibold mt-1" style={{ color: colors.textPrimary }}>
            {userData?.userId}
          </p>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full name */}
          <InputField
            label="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          {/* Email */}
          <InputField
            label="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Role Dropdown */}
          <SelectField
            label="Role"
            // options={["super-admin", "admin", "manager","support_executive", "read-only-viewer"]}
            options={loadingRoles ? ["Loading..."] : roles}
            value={formData.role}
            onChange={(v) => setFormData({ ...formData, role: v })}
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

          {/* Status Dropdown */}
          <SelectField
            label="Account Status"
            value={formData.status}
            options={["active", "inactive", "deactivated"]}
            onChange={(v) => setFormData({ ...formData, status: v })}
          />
        </div>

        {/* DASHBOARD ACCESS */}
        <div
          className="w-full p-5 rounded-xl mt-8"
          style={{
            background: colors.secondary,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <h3
            className="font-semibold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Dashboard Access
          </h3>

          {/* {DASHBOARD_SECTIONS.map((section, idx) => {
            const isOpen = expanded[idx];
            return (
              <div key={idx} className="mb-3">
                <button
                  className="w-full flex justify-between items-center py-3 px-3 rounded-lg"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }))
                  }
                  style={{
                    background: colors.inputBg,
                    border: `1px solid ${colors.cardBorder}`,
                    color: colors.textPrimary,
                  }}
                >
                  {section}
                  {isOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {isOpen && (
                  <div
                    className="p-3 rounded-lg mt-2 text-sm"
                    style={{
                      background: colors.primary,
                      border: `1px solid ${colors.cardBorder}`,
                      color: colors.textPrimary,
                    }}
                  >
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.dashboards?.includes(section)}
                        onChange={() => toggleDashboard(section)}
                      />
                      Enable Access
                    </label>
                  </div>
                )}
              </div>
            );
          })} */}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={handleClose}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(formData)}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: colors.buttonBg,
              color: colors.textPrimary,
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   INPUT FIELD COMPONENT
----------------------------------------------*/
function InputField({ label, value, placeholder, onChange }) {
  return (
    <div>
      <label
        className="text-sm font-medium"
        style={{ color: colors.textPrimary }}
      >
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 p-3 rounded-lg outline-none"
        style={{
          background: colors.inputBg,
          border: `1px solid ${colors.cardBorder}`,
          color: colors.textPrimary,
        }}
      />
    </div>
  );
}

/* ---------------------------------------------
   SELECT FIELD COMPONENT
----------------------------------------------*/
function SelectField({ label, options = [], value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>
        {label}
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 p-3 rounded-lg outline-none cursor-pointer"
        style={{
          background: colors.inputBg,
          border: `1px solid ${colors.cardBorder}`,
          color: colors.textPrimary,
        }}
      >
        <option value="">Select Role</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

