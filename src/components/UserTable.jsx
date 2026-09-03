import React, { useState } from "react";

import UserActionsMenu from "./UserActionsMenu";
import colors from "../constants/colors";


const UserTable = ({ users, onActionComplete }) => {
  const [openMenu, setOpenMenu] = useState(null);
  


  const roleColors = {
    "super-admin": { bg: "#8B000033", color: "#FF3B3B" },
    "admin": { bg: "#0F3D2233", color: "#4FD18B" },
    "manager": { bg: "#1E2A6A33", color: "#7DA6FF" },
    "support_executive": { bg: "#5A370A33", color: "#FFCE7A" },
    "read-only-viewer": { bg: "#5A2A8333", color: "#CFCFCF" },
    "moderator": { bg: "#4A121233", color: "#FF7A7A" },
  };

  const statusColors = {
    inactive: {
      bg: "#6C757D33",
      color: "#6C757D",
    },

    active: {
      bg: "#28C76F33",
      color: "#28C76F",
    },

    deactivated: {
      bg: "#EA545533",
      color: "#EA5455",
    },
  };

  if (!users || users.length === 0) {
    return (
      <div className="py-6 text-center" style={{ color: colors.textSecondary }}>
        No users found.
      </div>
    );
  }

  return (
    <table className="w-full text-left" style={{ tableLayout: "fixed" }}>
      <thead style={{ color: colors.textSecondary }}>
        <tr className="text-md">
          <th className="pb-3  w-[120px]">User ID</th>
          <th className="pb-3 pl-3 w-[160px]">Name</th>
          <th className="pb-3 pl-5 w-[260px]">Email</th>
          <th className="pb-3 pl-3 w-[180px]">Role</th>
          <th className="pb-3 pl-3 w-[120px]">Status</th>
          <th className="pb-3 pl-1  w-[150px]">Created</th>
          <th className="pb-3 w-[80px]">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => {
          const roleName = user.roleRef?.roleName || "Unknown";

          const roleStyle =
            roleColors[roleName] || {
              bg: colors.hover,
              color: colors.textPrimary,
            };

          const statusStyle =
            statusColors[user.status] || {
              bg: "#44444433",
              color: "#FFFFFF",
            };

          return (
            <tr
              key={user._id}
              className="text-sm border-t"
              style={{ borderColor: colors.cardBorder }}
            >
              <td className="py-4">{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              {/* ROLE */}
              <td>
                <span
                  className="px-3 py-1 rounded-lg text-xs font-medium capitalize"
                  style={{
                    backgroundColor: roleStyle.bg,
                    color: roleStyle.color,
                  }}
                >
                  {roleName}
                </span>
              </td>

              {/* STATUS */}
              <td>
                <span
                  className="px-3 py-1 rounded-lg text-xs font-medium capitalize"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                  }}
                >
                  {user.status}
                </span>
              </td>

              {/* CREATED DATE */}
              <td>
                {new Date(user.createdAt).toISOString().split("T")[0]}
              </td>

              {/* ACTIONS */}
              <td className="relative">
                <div
                  className="cursor-pointer text-xl pl-5"
                  style={{ color: colors.textSecondary }}
                  onClick={() =>
                    setOpenMenu(openMenu === user._id ? null : user._id)
                  }
                >
                  ⋮
                </div>

                {openMenu === user._id && (
                  <UserActionsMenu
                    id={user._id}
                    user={user}
                    onClose={() => setOpenMenu(null)}
                    onActionComplete={onActionComplete}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
