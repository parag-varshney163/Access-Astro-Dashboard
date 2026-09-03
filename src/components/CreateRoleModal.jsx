import { X, ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


export default function CreateRoleModal({ onClose, refresh }) {
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState({
    mod: false,
    ops: false,
    creator: false,
  });

  // ---------------- PERMISSIONS STATE ----------------
  const [permissions, setPermissions] = useState({
    // moderationDashboard: {
    //   view: false,
    //   customerSupport: false,
    //   report: false,
    //   moderationPanel: false,
    //   activityLog: false,
    //   qualityReview: false,
    //   creatorScores: false,
    //   accountManagement: false,
    //   insightsAndMetrics: false,
    //   adminControl: false,
    //   flagged:false,
    //   chatbotTemplate:false
    // },

    // operationsDashboard: {
    //   view: false,
    //   findYourVibe: false,
    //   trendingVibes: false,
    //   callEngagementHooks: false,
    //   audioCallFeed: false,
    //   scratchCards: false,
    //   virtualGiftings: false,
    //   gamesConfiguration: false,
    //   userLevels: false,
    //   coinsPack: false,
    //   passManagementSystem: false,
    //   quickRecharge: false,
    //   campaignPages: false,
    //   banners: false,
    //   learnAndHubManagement: false,
    //   leaderboardManagement: false,
    //   notificationSystem: false,
    //   userManagement: false,
    // },

    // creatorOnboardingPayoutsDashboard: {
    //   view: false,
    //   recentTrends: false,
    //   creators: false,
    //   applications: false,
    //   kycReview: false,
    //   userAnalytics: false,
    //   payoutRequest: false,
    //   payouts: false,
    //   websiteRequest: false,
    //   alertDashboard: false,
    //   settings: false,
    // },
     agamiCustomerDashboard: {
    view: false,
    customerSupport: false,
    chatBotTemplate: false,
    accountManagement: false,
    transactions: false,
    faqs: false,
    festivals: false,
    tutorialVideos: false,
    rashifal: false,
    notifications: false,
    dataInsights: false,
    autoPay: false,
  },

    // backend-required extras
    dashboard: { view: false, analytics: false },
    creator: { view: false, add: false, edit: false, delete: false, bulkOperations: false },
    application: { view: false, edit: false, reject: false },
    payouts: { view: false, process: false, bulk: false },
    userManagement: { view: false, create: false, edit: false, delete: false, manageRoles: false },
    settings: { view: false, edit: false },
  });
  const toSnakeCase = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");


  // ---------------- TOGGLE ALL (MAIN CHECKBOX) ----------------
  const toggleMain = (section) => {
    setPermissions((prev) => {
      const current = prev[section];
      const shouldEnable = !current.view;

      const updatedSection = Object.keys(current).reduce((acc, key) => {
        acc[key] = shouldEnable;
        return acc;
      }, {});

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  // ---------------- TOGGLE SINGLE PERMISSION ----------------
  const toggleField = (section, key) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  // ---------------- UI OPEN / CLOSE ----------------
  const toggleSectionUI = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // ---------------- CREATE ROLE ----------------
  const handleCreateRole = async () => {
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    const payload = {
      roleName:toSnakeCase(roleName),
      description: "Role created via admin dashboard",
      permissions,
    };

    try {
      setLoading(true);

      await axiosInstance.post("/api/v1/access-dashboard/roles", payload);

      alert("Role Created Successfully!");
      refresh?.();
      onClose();
    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999]" style={{ background: "#00000090" }}>
      <div
        className="rounded-xl"
        style={{
          width: "680px",
          background: colors.gradientVertical,
          border: `1px solid ${colors.cardBorder}`,
          padding: "40px",
        }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
            Create New Role
          </h2>
          <button onClick={onClose}>
            <X size={24} color={colors.textSecondary} />
          </button>
        </div>

        {/* ROLE NAME */}
        <label style={{ color: colors.textPrimary }}>Role Name</label>
        <input
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full mt-2 p-2 mb-6 rounded-lg outline-none"
          style={{
            background: colors.inputBg,
            color: colors.textPrimary,
            border: `1px solid ${colors.cardBorder}`,
          }}
        />

        {/* PERMISSIONS */}
        {/* <PermissionBlock
          title="Moderation & Support Dashboard"
          uiKey="mod"
          secKey="moderationDashboard"
          open={open}
          toggleSectionUI={toggleSectionUI}
          permissions={permissions}
          toggleMain={toggleMain}
          toggleField={toggleField}
          colors={colors}
          items={{
            customerSupport: "Customer Support",
            report: "Report Dashboard",
            moderationPanel: "Moderation Panel",
            activityLog: "Activity Log",
            flagged:"Flagged",
            chatbotTemplate:"Chatbot Template",
            qualityReview: "Quality Review",
            creatorScores: "Creator Scores",
            accountManagement: "Account Management",
            insightsAndMetrics: "Insights & Metrics",
            adminControl: "Admin Control",
          }}
        /> */}

        {/* <PermissionBlock
          title="Operations Dashboard"
          uiKey="ops"
          secKey="operationsDashboard"
          open={open}
          toggleSectionUI={toggleSectionUI}
          permissions={permissions}
          toggleMain={toggleMain}
          toggleField={toggleField}
          colors={colors}
          items={{
            findYourVibe: "Find Your Vibe",
            trendingVibes: "Trending Vibes",
            callEngagementHooks: "Call Engagement Hooks",
            audioCallFeed: "Audio Call Feed",
            scratchCards: "Scratch Cards",
            virtualGiftings: "Virtual Giftings",
            gamesConfiguration: "Games Configuration",
            userLevels: "User Levels",
            coinsPack: "Coins Pack",
            passManagementSystem: "Pass Management",
            quickRecharge: "Quick Recharge",
            campaignPages: "Campaign Pages",
            banners: "Banners",
            learnAndHubManagement: "Learn & Earn Hub",
            leaderboardManagement: "Leaderboard Management",
            notificationSystem: "Notification System",
            userManagement: "User Management",
          }}
        /> */}

        {/* <PermissionBlock
          title="Creator Onboarding & Payout Dashboard"
          uiKey="creator"
          secKey="creatorOnboardingPayoutsDashboard"
          open={open}
          toggleSectionUI={toggleSectionUI}
          permissions={permissions}
          toggleMain={toggleMain}
          toggleField={toggleField}
          colors={colors}
          items={{
            recentTrends: "Recent Trend",
            creators: "Creators",
            applications: "Applications",
            kycReview: "KYC Review",
            userAnalytics: "User Analytics",
            payoutRequest: "Payout Request",
            payouts: "Payouts",
            websiteRequest: "Website Request",
            alertDashboard: "Alert Dashboard",
            settings: "Settings",
          }}
        /> */}
        <PermissionBlock
  title="Agami Customer Dashboard"
  uiKey="agami"
  secKey="agamiCustomerDashboard"
  open={open}
  toggleSectionUI={toggleSectionUI}
  permissions={permissions}
  toggleMain={toggleMain}
  toggleField={toggleField}
  colors={colors}
  items={{
    customerSupport: "Customer Support",
    chatBotTemplate: "ChatBot Template",
    accountManagement: "Account Management",
    transactions: "Transactions",
    faqs: "FAQs",
    festivals: "Festivals",
    tutorialVideos: "Tutorial Videos",
    rashifal: "Rashifal",
    notifications: "Notifications",
    dataInsights: "Data Insights",
    autoPay: "Auto Pay",
  }}
/>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-lg"
            style={{ background: colors.cardBg, color: colors.textSecondary }}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleCreateRole}
            className="px-8 py-2 rounded-lg font-semibold"
            style={{
              background: colors.accent,
              color: colors.primary,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PERMISSION BLOCK ---------------- */
function PermissionBlock({
  title,
  uiKey,
  secKey,
  open,
  toggleSectionUI,
  permissions,
  toggleMain,
  toggleField,
  items,
  colors,
}) {
  return (
    <div
      className="p-5 rounded-xl mb-5"
      style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            checked={permissions[secKey].view}
            onChange={() => toggleMain(secKey)}
          />
          <h4
            className="font-semibold cursor-pointer"
            style={{ color: colors.textPrimary }}
            onClick={() => toggleSectionUI(uiKey)}
          >
            {title}
          </h4>
        </div>

        <button onClick={() => toggleSectionUI(uiKey)}>
          {open[uiKey] ? (
            <ChevronDown color={colors.textSecondary} />
          ) : (
            <ChevronRight color={colors.textSecondary} />
          )}
        </button>
      </div>

      {open[uiKey] && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {Object.keys(items).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={permissions[secKey][key]}
                onChange={() => toggleField(secKey, key)}
              />
              <span style={{ color: colors.textSecondary }}>{items[key]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

