import React, { useEffect, useRef, useState } from "react";
// ScheduleRemovalModal.jsx
import { Calendar, AlertTriangle } from "lucide-react";

import colors from "../constants/colors";


/**
 * Props:
 * - isOpen (bool)
 * - onClose () => void            // called after modal fully closed
 * - user (object)                 // { id, name, email } (optional)
 * - onSubmit (formData) => Promise<void>  // called when Schedule Removal clicked
 *
 * NOTE: modal manages its own form state and calls onSubmit(formData).
 */
export default function ScheduleRemovalModal({
  isOpen,
  onClose,
  user,
  onSubmit,
}) {
  const overlayRef = useRef(null);

  // local form state
  const [formData, setFormData] = useState({
    removalDateTime: "",
    reason: "",
  });
  

  // keep original overflow to restore exactly what was there
  const originalOverflowRef = useRef();

  // init form when user changes (so opening for different user resets fields)
  useEffect(() => {
    if (isOpen) {
      setFormData({ removalDateTime: "", reason: "" });
    }
  }, [isOpen, user?.id]);

  // Lock scroll on mount and restore on unmount
  useEffect(() => {
    if (!isOpen) return;

    // save existing overflow (may be "" or "auto")
    originalOverflowRef.current = document.body.style.overflow;
    // hide overflow
    document.body.style.overflow = "hidden";

    return () => {
      // restore previous overflow (even if empty string)
      document.body.style.overflow = originalOverflowRef.current || "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // central close handler that ensures scroll is restored before notifying parent
  const handleClose = () => {
    // restore overflow (defensive: immediate) then call parent
    document.body.style.overflow = originalOverflowRef.current || "";
    if (typeof onClose === "function") onClose();
  };

  const handleOverlayMouseDown = (e) => {
    // only close when clicking the overlay itself (not when clicking inside modal)
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleSubmit = async () => {
    if (!formData.removalDateTime) {
      alert("Please select a date & time.");
      return;
    }

    try {
      if (typeof onSubmit === "function") {
        await onSubmit(formData); // parent will do API call and refresh
      }
      // After successful submit, restore scroll and close
      handleClose();
    } catch (err) {
      console.error("Schedule removal failed:", err);
      alert("Failed to schedule removal. Please try again.");
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
      onMouseDown={handleOverlayMouseDown}
    >
      {/* modal panel */}
      <div
        className="w-full max-w-2xl rounded-2xl shadow-xl p-6 relative"
        style={{
          background: colors.cardBg, // use your cardBg so panel is solid
          border: `1px solid ${colors.cardBorder}`,
        }}
        // stop overlay clicks from bubbling when interacting with panel
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-xl font-bold"
          style={{ color: colors.textPrimary }}
          aria-label="Close"
        >
          ×
        </button>

        {/* TITLE */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: colors.textPrimary }}
        >
          Schedule Access Removal
        </h2>

        <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
          Set a future date and time when the user’s access will be automatically removed.
        </p>

        {/* INFO BANNER */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6"
          style={{
            background: colors.primary,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <Calendar size={22} color={colors.accent} />
          <div>
            <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
              Scheduled Removal
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              The user will be automatically deactivated at the selected date and time.
            </p>
          </div>
        </div>

        {/* USER DETAILS */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{
            border: `1px solid ${colors.cardBorder}`,
            background: colors.secondary,
          }}
        >
          <h3 className="font-semibold text-lg mb-4" style={{ color: colors.textPrimary }}>
            User Details
          </h3>
          <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
            <p>
              <span className="opacity-70">User ID:</span> {user?.userId ?? "—"}
            </p>
            <p>
              <span className="opacity-70">Name:</span> {user?.name ?? "—"}
            </p>
            <p>
              <span className="opacity-70">Email:</span> {user?.email ?? "—"}
            </p>
          </div>
        </div>

        {/* FORM */}
        <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>
          Removal Date & Time
        </label>
        <input
          type="datetime-local"
          className="w-full mt-2 p-3 rounded-lg mb-4 outline-none"
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            color: colors.textPrimary,
          }}
          value={formData.removalDateTime}
          onChange={(e) => setFormData({ ...formData, removalDateTime: e.target.value })}
        />

        <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>
          Reason (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g., Last working day, Contract end"
          className="w-full mt-2 p-3 rounded-lg mb-6 outline-none"
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            color: colors.textPrimary,
          }}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />

        {/* WARNING */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6"
          style={{
            background: "#2a1f1f",
            border: `1px solid ${colors.warning}`,
          }}
        >
          <AlertTriangle size={22} color={colors.warning} />
          <p className="text-sm" style={{ color: colors.warning }}>
            At the scheduled time, the user will be logged out and their access removed.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-xl font-semibold"
            style={{
              background: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            style={{
              background: colors.buttonBg,
              color: colors.textPrimary,
            }}
          >
            <Calendar size={18} />
            Schedule Removal
          </button>
        </div>
      </div>
    </div>
  );
}
