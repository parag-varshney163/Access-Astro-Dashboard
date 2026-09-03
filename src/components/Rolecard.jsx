import { Pencil, Trash2 } from "lucide-react";
import React from "react";

import colors from "../constants/colors";
import Button from "./ui/Button";


export default function RoleCard({ role, onEdit, onDelete }) {
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-5"
      style={{ borderColor: colors.cardBorder, background: colors.cardBg }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: colors.textPrimary }}
          >
            {role.title
              ? role.title.charAt(0).toUpperCase() + role.title.slice(1)
              : ""}
          </h2>

          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            {role.dashboards.length} Dashboards
          </p>
        </div>

        <span
          className="px-4 py-1 rounded-lg text-sm font-medium"
          style={{
            backgroundColor:
              role.status === "Active"
                ? colors.success
                : role.status === "Inactive"
                ? colors.danger
                : colors.warning,
            color: "#000",
          }}
        >
          {role.status}
        </span>
      </div>

      {/* Dashboard List */}
      <div className="flex flex-col gap-4">
        {role.dashboards.map((d, index) => (
          <div
            key={index}
            className="rounded-xl p-4"
            style={{ background: colors.secondary }}
          >
            <p
              className="font-semibold text-base"
              style={{ color: colors.textPrimary }}
            >
              {d.dashboardName}
            </p>

            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
              {d.accessibleTabs} tabs accessible
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          fullWidth
          icon={Pencil}
          className="rounded-xl"
          onClick={() => onEdit(role)}
        >
          Edit
        </Button>

        {onDelete && (
          <Button
            variant="custom"
            fullWidth
            bg={colors.danger}
            text="#fff"
            icon={Trash2}
            className="rounded-xl"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}


