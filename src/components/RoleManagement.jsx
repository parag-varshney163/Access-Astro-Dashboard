import React, { useState, useEffect } from "react";

import axiosInstance from "../api/axiosInstance";
import CreateRoleModal from "./CreateRoleModal";
import EditRoleModal from "./EditRoleModal";
import colors from "../constants/colors";
import RoleCard from "./Rolecard";
import Button from "./ui/Button";


export default function RoleManagement() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRolesData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        "/api/v1/access-dashboard/role-dashboard-access"
      );

      const apiRoles = res.data.data.roles;

      const formatted = apiRoles.map((role) => ({
        _id: role.roleId,
        title: role.roleName,
        status: role.status,
        dashboards: role.accessibleDashboards.map((db) => ({
          dashboardName: db.name,
          accessibleTabs: db.accessibleTabs,
        })),
      }));

      setRoles(formatted);
      
    } catch (err) {
      console.error("Error loading role data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesData();
  }, []);

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenEditModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await axiosInstance.delete(`/api/v1/access-dashboard/roles/${roleId}`);
      alert("Role deleted successfully!");
      fetchRolesData(); // refresh list
    } catch (err) {
      console.error("Error deleting role", err);
      alert("Failed to delete role. Try again.");
    }
  };

  return (
    <>
      <div className="p-10" style={{ background: colors.primary }}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
              Role Management
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Manage role permissions & dashboard access
            </p>
          </div>

          <Button
            variant="custom"
            bg={colors.accent}
            text={colors.primary}
            onClick={() => setOpenCreateModal(true)}
          >
            + Create New Role
          </Button>
        </div>

        {loading ? (
          <p style={{ color: colors.textSecondary }}>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {roles.map((role) => (
              <RoleCard
                key={role._id}
                role={role}
                onEdit={handleEditRole}
                onDelete={() => handleDeleteRole(role._id)} // Added delete prop
              />
            ))}
          </div>
        )}
      </div>

      {openCreateModal && (
        <CreateRoleModal
          onClose={() => setOpenCreateModal(false)}
          refresh={fetchRolesData}
        />
      )}

      {openEditModal && (
        <EditRoleModal
          roleId={selectedRole?._id}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          refresh={fetchRolesData}
        />
      )}
    </>
  );
}
