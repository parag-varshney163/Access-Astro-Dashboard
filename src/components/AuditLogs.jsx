import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pagination state
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/admin-dashboard/settings/audit-logs"
        );

        const list = res?.data?.data?.logs || [];
        setLogs(list);
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  // 🔹 Format action nicely → "CREATE_USER" → "Create User"
  const formatAction = (text) =>
    text
      ?.toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // 🔹 Format date readable
  const formatDate = (date) => new Date(date).toLocaleString();

  // 🔹 Pagination logic
  const totalPages = Math.ceil(logs.length / LIMIT);

  const paginatedLogs = logs.slice(
    (page - 1) * LIMIT,
    page * LIMIT
  );

  if (loading) {
    return (
      <div
        className="p-6 rounded-2xl"
        style={{ background: colors.secondary, color: colors.textSecondary }}
      >
        Loading audit logs...
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-2xl mt-6"
      style={{
        background: colors.secondary,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <h2 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
        Audit Logs
      </h2>
      <p className="mt-1 mb-4 text-sm" style={{ color: colors.textSecondary }}>
        Track all role changes and access modifications
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr
              style={{
                color: colors.textPrimary,
                borderBottom: `1px solid ${colors.cardBorder}`,
              }}
            >
              <th className="py-3">Timestamp</th>
              <th className="py-3">User</th>
              <th className="py-3">Action</th>
              <th className="py-3">Target</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6"
                  style={{ color: colors.textSecondary }}
                >
                  No audit logs found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b"
                  style={{ borderColor: colors.cardBorder }}
                >
                  {/* Timestamp */}
                  <td
                    className="py-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {formatDate(log.createdAt)}
                  </td>

                  {/* User */}
                  <td
                    className="py-4"
                    style={{ color: colors.textPrimary }}
                  >
                    {log?.adminId?.name || "N/A"}
                  </td>

                  {/* Action */}
                  <td className="py-4">
                    <span
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{
                        background: `${colors.accent}22`,
                        border: `1px solid ${colors.accent}`,
                        color: colors.accent,
                      }}
                    >
                      {formatAction(log.action)}
                    </span>
                  </td>

                  {/* Target */}
                  <td
                    className="py-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {log.resourceType || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="flex justify-between items-center mt-5"
          style={{ color: colors.textSecondary }}
        >
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-1 rounded-lg"
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-1 rounded-lg"
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                opacity: page === totalPages ? 0.5 : 1,
                cursor:
                  page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
