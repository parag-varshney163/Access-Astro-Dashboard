import { LogOut, Plus } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";
import logo from "../../assets/logo.webp";
import Button from "./Button";


export default function Navbar({ onCreateUser, onLogout,user }) {
  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  return (
    <div
      style={{
        width: "100%", // FULL WIDTH
        backgroundColor: colors.primary,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          style={{ height: "70px", width: "70px", borderRadius: "10px" }}
        />

        <div className="text-center "> 
          <h1
            style={{
              color: colors.textPrimary,
              fontSize: "26px",      // ↓ Smaller Font
              fontWeight: "700",
              margin: 0,
              lineHeight: "32px",
              
            }}
          >
            Access Control &{" "}
            <span style={{ color: colors.accent }}>Role Management</span>
          </h1>

          {/* <p
            style={{
              color: colors.textSecondary,
              fontSize: "15px",
              margin: "3px 0 0",
            }}
          >
            Hangoutclub Admin Dashboard
          </p> */}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Admin Info */}
        <div className="" style={{ textAlign: "right" }}>
          <p className="pr-5"
            style={{
              color: colors.textPrimary,
              fontSize: "18px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            {capitalize(user?.role)} User
          </p>

          <p
            style={{
              color: colors.accent,
              fontSize: "15px",
              margin: 0,
            }}
          >
            {user?.email}
          </p>
        </div>

        {/* Create New User Button */}
        <Button
          variant="custom"
          bg={colors.accent}
          text={colors.primary}
          size="md"
          icon={Plus}
          motionEffect={true}
          onClick={onCreateUser}
        >
          Create New User
        </Button>

        {/* Logout Button */}
        <Button
          variant="custom"
          bg="transparent"
          text={colors.textPrimary}
          size="md"
          icon={LogOut}
          motionEffect={true}
          onClick={onLogout}
          style={{
            border: `1px solid ${colors.cardBorder}`,
            padding: "10px 18px",
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
