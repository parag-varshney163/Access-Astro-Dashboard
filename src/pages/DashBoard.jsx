import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import PermissionsMatrix from "../components/PermissionsMatrix";
import CreateUserModal from "../components/CreateUserModal";
import RoleManagement from "../components/RoleManagement";
import UserDirectory from "../components/UserDirectory";
import SettingsTabs from "../components/SettingsTab";
import StatsCard from "../components/StatsCard";
import AuditLogs from "../components/AuditLogs";
import Navbar from "../components/ui/Navbar";
import colors from "../constants/colors";


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("User Directory");
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin"));

  


  // 🔥 This runs when a user is created / deleted / updated
  const handleActionComplete = () => {
    setReloadKey(prev => prev + 1); // force re-render children
  };

  return (
    <div
      className="min-h-screen text-white overflow-y-auto"
      style={{ background: colors.gradientVertical }}
    >
      <Navbar
        onCreateUser={() => setIsModalOpen(true)}
        onLogout={() => {
          localStorage.removeItem("token");
          
          navigate("/login");
        }}
        user={user}
      />

      <div className="p-6">
        {/* 🔥 These will both refresh when reloadKey changes */}
        <StatsCard reloadKey={reloadKey} />
        <SettingsTabs onTabChange={setSelectedTab} />

        {selectedTab === "User Directory" && (
          <UserDirectory
            reloadKey={reloadKey}
            onActionComplete={handleActionComplete}
          />
        )}

        {selectedTab === "Role Management" && (
          <RoleManagement reloadKey={reloadKey} />
        )}

        {selectedTab === "Audit Logs" && <AuditLogs reloadKey={reloadKey} />}
        {selectedTab === "Permissions Matrix" && (
          <PermissionsMatrix reloadKey={reloadKey} />
        )}
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleActionComplete} // 🔥 triggers re-render
      />
    </div>
  );
}
