import { X, AlertTriangle, Eye, EyeOff, Copy } from 'lucide-react';
import React, { useState } from 'react';

import colors from '../constants/colors';


export default function ResetPasswordDisplayModal({ isOpen, data, onClose }) {

    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen || !data) return null;

    const user = data?.user || {};
    const newPassword = data?.newPassword || "";   // ✅ SAFE default
    const maskedPassword = "•".repeat(newPassword?.length || 0);  // ✅ NO CRASH

    const userName = user?.name || user?.id || "the user";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div
                className="rounded-2xl shadow-2xl p-6 w-96 max-w-lg"
                style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                    color: colors.textPrimary
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center pb-3 mb-4">
                    <h2 className="text-2xl font-bold">Reset Password</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full transition"
                        style={{ background: "transparent" }}
                    >
                        <X size={24} color={colors.textPrimary} />
                    </button>
                </div>

                <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                    New password generated for <span className="font-semibold">{userName}</span>
                </p>

                {/* Security Warning */}
                <div
                    className="p-4 rounded-xl mb-6 flex items-start gap-3"
                    style={{
                        backgroundColor: colors.secondary,
                        borderLeft: `4px solid ${colors.danger}`
                    }}
                >
                    <AlertTriangle size={20} style={{ color: colors.danger }} />

                    <div>
                        <p className="font-semibold" style={{ color: colors.danger }}>
                            Security Warning:
                        </p>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                            This password will only be shown once. Copy it now and share securely with the user.
                        </p>
                    </div>
                </div>

                {/* Password Display Box */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">New Password</h3>

                    <div
                        className="flex items-center p-3 rounded-lg border"
                        style={{
                            borderColor: colors.cardBorder,
                            backgroundColor: colors.inputBg
                        }}
                    >
                        {/* Password */}
                        <span className="flex-grow text-lg font-mono truncate">
                            {showPassword ? newPassword : maskedPassword}
                        </span>

                        {/* Icons */}
                        <div className="flex gap-2 ml-4">

                            {/* Show/Hide */}
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-1 rounded transition"
                                style={{ backgroundColor: colors.hover }}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color={colors.textPrimary} />
                                ) : (
                                    <Eye size={20} color={colors.textPrimary} />
                                )}
                            </button>

                            {/* Copy */}
                            <button
                                onClick={() => navigator.clipboard.writeText(newPassword)}
                                className="p-1 rounded transition"
                                style={{ backgroundColor: colors.hover }}
                                disabled={!newPassword}
                            >
                                <Copy size={20} color={colors.textPrimary} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Done Button */}
                <button
                    onClick={onClose}
                    className="w-full py-3 rounded-lg text-lg font-bold transition"
                    style={{
                        backgroundColor: colors.accent,
                        color: "#000"
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
