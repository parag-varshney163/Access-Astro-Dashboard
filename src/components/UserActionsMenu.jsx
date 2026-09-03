// UserActionsMenu.jsx
import { Pencil, RotateCw, UserX, Calendar, LogOut, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import ResetPasswordDisplayModal from "./ResetPasswordDisplayModal";
import ScheduleRemovalModal from "./ScheduleRemovalModal";
import axiosInstance from "../api/axiosInstance";
import EditUserModal from "./EditUserModel";
import colors from "../constants/colors";


export default function UserActionsMenu({ id, user, onClose, onActionComplete }) {
    const menuRef = useRef();

    const [scheduleUser, setScheduleUser] = useState(null);
    const [resetData, setResetData] = useState(null);
    const [editUser, setEditUser] = useState(null);

    const [formData, setFormData] = useState({
        removalDateTime: "",
        reason: "",
    });

    /** --------------------------------------------------
     * PREVENT MENU FROM CLOSING WHEN ANY MODAL IS OPEN
     ----------------------------------------------------*/
    useEffect(() => {
        const handler = (e) => {
            if (scheduleUser || resetData || editUser) return;

            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [scheduleUser, resetData, editUser, onClose]);

    /** --------------------------------------------------
     * FORCE LOGOUT
     ----------------------------------------------------*/
    const handleForceLogout = async () => {
        if (!confirm("Are you sure you want to force logout this user?")) return;
        try {
            await axiosInstance.put(`/api/v1/access-dashboard/actions/force-logout/${id}`);
            alert("User logged out successfully.");
            await onActionComplete();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to force logout.");
        }
    };

    /** --------------------------------------------------
     * RESET PASSWORD
     ----------------------------------------------------*/
    const handleResetPassword = async () => {
        if (!confirm(`Are you sure you want to reset the password for ${user?.name || "this user"}?`)) {
            return;
        }

        try {
            const response = await axiosInstance.put(
                `/api/v1/access-dashboard/actions/reset-password/${id}`
            );

            // FIXED: Correct extraction of new password
            const newPassword = response.data?.data?.generatedPassword;

            if (!newPassword) {
                alert("Password not returned by API.");
                return;
            }

            setResetData({
                user: user,
                newPassword: newPassword,
            });

        } catch (err) {
            console.error(err);
            alert("Failed to reset password.");
        }
    };

    /** --------------------------------------------------
     * DELETE ACCOUNT
     ----------------------------------------------------*/
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to DELETE this user?")) return;
        try {
            await axiosInstance.delete(`/api/v1/access-dashboard/actions/delete-account/${id}`);
            alert("User deleted successfully.");
            await onActionComplete();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Delete failed.");
        }
    };

    /** --------------------------------------------------
     * UPDATE USER STATUS
     ----------------------------------------------------*/
    const handleStatusUpdate = async (status) => {
        if (!confirm(`Are you sure you want to ${status} this user?`)) return;

        try {
            await axiosInstance.put(`/api/v1/access-dashboard/actions/update-status/${id}`, { status });
            alert(`User ${status} successfully.`);
            await onActionComplete();
            onClose();
        } catch (err) {
            console.error(err);
            alert(`${status} failed.`);
        }
    };

    /** --------------------------------------------------
     * OPEN SCHEDULE REMOVAL MODAL
     ----------------------------------------------------*/
    const openScheduleModal = () => {
        setScheduleUser(user || { id });
    };

    return (
        <>
            {/* ACTION MENU */}
            <div
                ref={menuRef}
                className="absolute right-0 bottom-full mb-2 w-60 rounded-2xl shadow-xl z-50 p-3 backdrop-blur-lg"
                style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                }}
            >
                <div
                    className="flex flex-col gap-1 pb-3"
                    style={{ borderBottom: `1px solid ${colors.cardBorder}` }}
                >
                    <ActionItem icon={<Pencil size={18} />} label="Edit Role" onClick={() => setEditUser(user)} />
                    <ActionItem icon={<RotateCw size={18} />} label="Reset Password" onClick={handleResetPassword} />
                    <ActionItem
                        icon={<UserX size={18} />}
                        label="Deactivate"
                        onClick={() => handleStatusUpdate("deactivated")}
                    />
                </div>

                <div className="flex flex-col gap-1 pt-3">
                    <ActionItem
                        icon={<Calendar size={18} />}
                        label="Schedule Access Removal"
                        onClick={openScheduleModal}
                    />

                    <ActionItem
                        icon={<LogOut size={18} />}
                        label="Force Logout"
                        onClick={handleForceLogout}
                    />

                    <ActionItem
                        icon={<Trash2 size={18} />}
                        label="Delete Account"
                        danger
                        onClick={handleDelete}
                    />
                </div>
            </div>

            {/* SCHEDULE REMOVAL MODAL */}
            <ScheduleRemovalModal
                isOpen={!!scheduleUser}
                user={scheduleUser}
                formData={formData}
                setFormData={setFormData}
                onClose={() => {
                    setScheduleUser(null);
                    setFormData({ removalDateTime: "", reason: "" });
                }}
                onSubmit={async (formData) => {
                    try {
                        await axiosInstance.post(
                            `/api/v1/access-dashboard/actions/schedule-removal/${scheduleUser._id}`,
                            formData
                        );
                        alert("Access removal scheduled.");
                        await onActionComplete();
                        setScheduleUser(null);
                    } catch (err) {
                        console.error(err);
                        alert("Failed to schedule removal.");
                    }
                }}
            />

            {/* EDIT USER MODAL */}
            <EditUserModal
                isOpen={!!editUser}
                userData={editUser}
                onClose={() => setEditUser(null)}
                onSubmit={async (form) => {
                    try {
                        await axiosInstance.put(`/api/v1/access-dashboard/actions/${editUser._id}`, form);
                        onActionComplete();
                        setEditUser(null);
                        alert("User edited successfully");
                    } catch (err) {
                        console.error(err);
                        alert("Failed to edit");
                    }
                }}
            />

            {/* RESET PASSWORD MODAL */}
            <ResetPasswordDisplayModal
                isOpen={!!resetData}
                data={resetData}
                onClose={() => {
                    setResetData(null);
                    onActionComplete();
                    setTimeout(() => onClose(), 100);
                }}
            />
        </>
    );
}

function ActionItem({ icon, label, danger, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition"
            style={{
                color: danger ? colors.danger : colors.textPrimary,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
}
