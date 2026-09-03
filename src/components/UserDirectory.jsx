import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";
import UserTable from "./UserTable";


const rolesList = [
  'super-admin',
  'admin',
  'manager',
  'support_executive',
  'read-only-viewer',
  'moderator',

];

const UserDirectory = ({reloadKey}) => {
  const [admins, setAdmins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  
  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/access-dashboard/admins");
      const list = res?.data?.data?.admins || [];
      setAdmins(list);
      setFiltered(list);
      return;

    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };
useEffect(() => {
  fetchAdmins();
}, [reloadKey]);


  // SEARCH + FILTER
  useEffect(() => {
    let result = admins;

    if (search.trim() !== "") {
      result = result.filter((u) =>
        u.userId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedRole !== "All Roles") {
      result = result.filter((u) => u.roleRef?.roleName === selectedRole);
    }

    setFiltered(result);
  }, [admins, search, selectedRole]);

  return (
    <div
      className="p-8 mt-6 rounded-2xl"
      style={{
        backgroundColor: colors.secondary,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: colors.textPrimary }}
          >
            User Directory
          </h2>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            Manage all user accounts and their access levels
          </p>
        </div>

        {/* Search + Role Filter */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div
            className="flex items-center px-4 py-2 rounded-lg"
            style={{
              backgroundColor: colors.primary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <Search size={18} color={colors.textSecondary} />
            <input
              type="text"
              placeholder="Search users..."
              className="ml-2 bg-transparent outline-none text-sm"
              style={{ color: colors.textPrimary }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Dropdown */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm outline-none cursor-pointer"
            style={{
              backgroundColor: colors.primary,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary,
            }}
          >
            <option>All Roles</option>
            {rolesList.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PASS DATA TO TABLE */}
      <UserTable users={filtered} onActionComplete={fetchAdmins} />
    </div>
  );
};

export default UserDirectory;

