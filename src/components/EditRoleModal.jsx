import { X, ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


// -----------------------------------------------------------------------------
// DASHBOARD → UI LIST
// -----------------------------------------------------------------------------
const DASHBOARD_DATA = {
  "Moderation and Customer Support Dashboard": [
    "Report Dashboard",
    "Moderation Panel",
    "Activity Log",
    "Quality Review",
    "Creator Scores",
    "Customer Support",
    "Account Management",
    "Insights & Metrics",
    "Admin Control",
    "Flagged",
    "Chatbot Template",
    "Live Feed",
    "Graph Anaylsis",
    "Last 5 Calls",
    "Revoke Access",
    "User Transaction Settlement",
    "Chat Moderation",
    "Chat Access",
    "Mute Calls",
    "Device Association"
  ],

  "Operations Dashboard": [
    "Find Your Vibe",
    "Trending Vibes",
    "Call Engagement Hooks",
    "Audio Call Feed",
    "Scratch Cards",
    "Virtual Gifting",
    "Games Configuration",
    "User Levels",
    "Referral",
    "Coins Packs",
    "Pass Management",
    "Quick Recharge",
    "Campaign Pages",
    "Banners",
    "Learn & Earn Hub",
    "Leadership Management",
    "Notification System",
    "User Management",
    "Recharge PopUp",
    "Audit Logs",
    "Creator Earning",
    "Chat Access",
    "Auto Chat",
    "Coupon",
    "Banner Management",
    "Community"
  ],

  "Creator Onboarding and Payouts Dashboard": [
    "Recent Trend",
    "Creators",
    "Applications",
    "KYC Review",
    "User Analytics",
    "Payout Request",
    "Payouts",
    "Website Request",
    "Alert Dashboard",
    "Daily Business Health",
    "Supply Insight",
    "Feature Flags",
    "Creator Detail",
    "FireBaseEvent",
    "TopLine Metrics",
    "Audit Logs",
    "Call Auditing",
    "Creator Progress",
    "Creator Manager",
    "Settings",
    "Screenshot Whitelist"
  ],
  "Calling Dashboard": [
    "New Onboarding",
    "Re Activation",
    "Summary",
    "Settings"

  ],
  "Analytics Dashboard": [
    "Supply Side",
    "Demand Side",
    "Recharge",
    "Notification",
    "Weekly Report + Transactions",
    "Trust & Safety",
    "User Journey",
    "Server Monitor",
    "State and City Breakdown",
    "Free Call(2 Rupees)"
  ],
  "Agami Astro Dashboard": [
    "Customer Support(bot)",
    "Account Management(Astro)",
    "Chatbot Template(Astro)",
    "Transactions",
    "Faqs",
    "Festivals",
    "Tutorial Videos",
    "Rashifal",
    "Notifications",
    "Data Insights",
    "Auto Pay & Chat Limit"
    
  ],
};


// -----------------------------------------------------------------------------
// UI LABEL → BACKEND KEY
// -----------------------------------------------------------------------------
const BACKEND_KEYS = {
  "Report Dashboard": "report",
  "Moderation Panel": "moderationPanel",
  "Activity Log": "activityLog",
  "Quality Review": "qualityReview",
  "Creator Scores": "creatorScores",
  "Customer Support": "customerSupport",
  "Account Management": "accountManagement",
  "Insights & Metrics": "insightsAndMetrics",
  "Admin Control": "adminControl",
  "Flagged": "flagged",
  "Chatbot Template": "chatbotTemplate",
  "Live Feed": "liveFeed",
  "Graph Anaylsis": "userAndCreatorAnalysis",
  "Last 5 Calls": "last5Calls",
  "Revoke Access": "revokeAccess",
  "User Transaction Settlement": "transactionSettlement",
  "Chat Moderation": "chatModeration",
  "Chat Access":"chatAccess",
  "Mute Calls":"muteCalls",
  "Device Association":"deviceAssociated",

  "Find Your Vibe": "findYourVibe",
  "Trending Vibes": "trendingVibes",
  "Call Engagement Hooks": "callEngagementHooks",
  "Audio Call Feed": "audioCallFeed",
  "Scratch Cards": "scratchCards",
  "Virtual Gifting": "virtualGiftings",
  "Games Configuration": "gamesConfiguration",
  "User Levels": "userLevels",
  "Coins Packs": "coinsPack",
  "Pass Management": "passManagementSystem",
  "Quick Recharge": "quickRecharge",
  "Campaign Pages": "campaignPages",
  "Banners": "banners",
  "Learn & Earn Hub": "learnAndHubManagement",
  "Leadership Management": "leaderboardManagement",
  "Notification System": "notificationSystem",
  "User Management": "userManagement",
  "Referral": "referral",
  "Recharge PopUp": "rechargePopup",
  "Audit Logs": "auditLogs",
  "Creator Earning": "creatorEarning",
  "Chat Access": "chatAccess",
  "Auto Chat":"autoScript",
  "Coupon":"coupon",
  "Banner Management":"bannerMangement",
  "Community":"communityGuidelines",

  "Recent Trend": "recentTrends",
  "Creators": "creators",
  "Applications": "applications",
  "KYC Review": "kycReview",
  "User Analytics": "userAnalytics",
  "Payout Request": "payoutRequest",
  "Payouts": "payouts",
  "Website Request": "websiteRequest",
  "Alert Dashboard": "alertDashboard",
  "Daily Business Health": "dailyBusinessHealth",
  "Supply Insight": "supplyInsight",
  "Feature Flags": "featureFlags",
  "Creator Detail": "creatorDetail",
  "FireBaseEvent": "firebaseEvent",
  "TopLine Metrics": "topLineMetrics",
  "Audit Logs": "auditLogs",
  "Call Auditing": "callAuditing",
  "Creator Progress": "creatorProgress",
  "Settings": "settings",
  "Creator Manager": "creatorManager",
  "Screenshot Whitelist": "screenshotWhiteList",

  "New Onboarding": "newOnboarding",
  "Re Activation": "reactivation",
  "Summary": "summary",
  "Settings": "settings",

  "Supply Side": "supplySide",
  "Demand Side": "demandSide",
  "Recharge": "recharge",
  "Notification": "notification",
  "Weekly Report + Transactions": "weeklyReport",
  "Trust & Safety": "trustAndSafety",
  "User Journey":"userJourney",
  "Server Monitor":"serverMonitor",
  "State and City Breakdown":"stateAndCityWise",
  "Free Call(2 Rupees)":"freeCall",

  "Customer Support(bot)": "customerSupport",
  "Account Management(Astro)": "accountManagement",
  "Chatbot Template(Astro)": "chatBotTemplate",
  "Transactions": "transactions",
  "Faqs": "faqs",
  "Festivals": "festivals",
  "Tutorial Videos": "tutorialVideos",
  "Rashifal": "rashifal",
  "Notifications":"notifications",
  "Data Insights":"dataInsights",
  "Auto Pay & Chat Limit":"autoPay"

};


// -----------------------------------------------------------------------------
// UI LABEL → BACKEND DASHBOARD NAME
// -----------------------------------------------------------------------------
const DASHBOARD_KEY_MAP = {
  "Moderation and Customer Support Dashboard": "moderationDashboard",
  "Operations Dashboard": "operationsDashboard",
  "Creator Onboarding and Payouts Dashboard": "creatorOnboardingPayoutsDashboard",
  "Calling Dashboard": "callingDashboard",
  "Analytics Dashboard": "analyticsDashboard",
  "Agami Astro Dashboard":"agamiCustomerDashboard"
};



// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function EditRoleModal({ isOpen, onClose, roleId, refresh }) {
  const [roleName, setRoleName] = useState("");
  const [badgeColor, setBadgeColor] = useState("Gray");
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState({
    mod: false,
    ops: false,
    creator: false,
    calling: false,
    analytics: false,
    agami:false
  });


  // Toggle Checkbox
  // 🔹 Toggle single item (child)
  const toggleItem = (name) => {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // 🔹 Toggle parent → select/deselect ALL children
  const toggleParent = (parent) => {
    setSelected((prev) => {
      const isEnabled = !!prev[parent];
      const updated = { ...prev, [parent]: !isEnabled };

      DASHBOARD_DATA[parent].forEach((child) => {
        updated[child] = !isEnabled;
      });

      return updated;
    });
  };



  // ---------------------------------------------------------------------------
  // LOAD ROLE DATA (Pre-fill)
  // ---------------------------------------------------------------------------
  const loadRole = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/api/v1/access-dashboard/roles/${roleId}`);

      // API response: data.data
      const roleData = res?.data?.data;
      if (!roleData) {
        console.error("❌ Role not found:", res);
        return;
      }

      // Pre-fill form fields
      setRoleName(roleData.roleName || "");
      setBadgeColor(roleData.badgeColor || "Gray");

      // Pre-fill permissions
      const initial = {};
      const perms = roleData.permissions || {};

      Object.entries(DASHBOARD_KEY_MAP).forEach(([uiName, backendKey]) => {
        const dashboard = perms[backendKey];
        if (!dashboard) return;

        // Dashboard view
        if (dashboard.view) initial[uiName] = true;

        // Tabs
        DASHBOARD_DATA[uiName].forEach((tab) => {
          const backendTabKey = BACKEND_KEYS[tab];
          if (backendTabKey && dashboard[backendTabKey]) {
            initial[tab] = true;
          }
        });
      });

      setSelected(initial);
    } catch (err) {
      console.error("Error loading role:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && roleId) loadRole();
  }, [isOpen, roleId]);

  if (!isOpen) return null;



  // ---------------------------------------------------------------------------
  // SAVE ROLE (PUT API)
  // ---------------------------------------------------------------------------
  const saveChanges = async () => {
    try {
      const permissions = {};

      Object.entries(DASHBOARD_KEY_MAP).forEach(([uiName, backendKey]) => {
        permissions[backendKey] = {
          view: !!selected[uiName],
        };

        DASHBOARD_DATA[uiName].forEach((tab) => {
          const backendTab = BACKEND_KEYS[tab];
          permissions[backendKey][backendTab] = !!selected[tab];
        });
      });

      const payload = { roleName, permissions };

      await axiosInstance.put(`/api/v1/access-dashboard/roles/${roleId}`, payload);

      refresh();
      onClose();
    } catch (err) {
      console.error("Error saving role:", err);
    }
  };



  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]" style={{ background: "#00000090" }}>
      <div
        className="rounded-xl relative"
        style={{
          width: "680px",
          background: colors.secondary,
          maxHeight: "90vh",
          overflowY: "auto",
          border: `1px solid ${colors.cardBorder}`,
          padding: "40px",
        }}
      >
        <button className="absolute top-5 right-5" onClick={onClose}>
          <X size={22} color={colors.textSecondary} />
        </button>

        <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
          Edit Role
        </h2>

        <p className="mt-2 mb-8" style={{ color: colors.textSecondary }}>
          Modify role details and permissions
        </p>

        {loading ? (
          <p style={{ color: colors.textSecondary }}>Loading...</p>
        ) : (
          <>
            {/* FORM */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <label className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  Role Name
                </label>
                <input
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full mt-2 p-3 rounded-lg outline-none"
                  style={{
                    background: colors.inputBg,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.cardBorder}`,
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  Badge Color
                </label>
                <select
                  value={badgeColor}
                  onChange={(e) => setBadgeColor(e.target.value)}
                  className="w-full mt-2 p-3 rounded-lg outline-none"
                  style={{
                    background: colors.inputBg,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.cardBorder}`,
                  }}
                >
                  <option>Gray</option>
                  <option>Red</option>
                  <option>Yellow</option>
                  <option>Blue</option>
                </select>
              </div>
            </div>

            {/* PERMISSIONS */}
            <div className="mb-4"> 
              <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                Dashboard & Tab Access
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Select dashboards and specific tabs
              </p>
            </div>

            {/* {renderAccordion("mod", "Moderation and Customer Support Dashboard")}
            {renderAccordion("ops", "Operations Dashboard")}
            {renderAccordion("creator", "Creator Onboarding and Payouts Dashboard")}
            {renderAccordion("calling", "Calling Dashboard")}
            {renderAccordion("analytics", "Analytics Dashboard")} */}
            {renderAccordion("agami", "Agami Astro Dashboard")}

            {/* FOOTER */}
            <div className="flex justify-end gap-4 pt-6 mt-6" style={{ borderTop: `1px solid ${colors.cardBorder}` }}>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg font-medium"
                style={{ background: colors.cardBg, color: colors.textSecondary }}
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="px-6 py-2 rounded-lg font-semibold"
                style={{ background: colors.accent, color: colors.primary }}
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );


  // ---------------------------------------------------------------------------
  // ACCORDION GENERATOR
  // ---------------------------------------------------------------------------
  function renderAccordion(key, title) {
    return (
      <AccordionBlock
        title={title}
        open={open[key]}
        toggle={() => setOpen({ ...open, [key]: !open[key] })}
        items={DASHBOARD_DATA[title]}
        selected={selected}
        toggleItem={toggleItem}
        toggleParent={toggleParent}
        colors={colors}
      />
    );
  }
}



// -----------------------------------------------------------------------------
// ACCORDION COMPONENT
// -----------------------------------------------------------------------------
function AccordionBlock({ title, open, toggle, items, selected, toggleItem, toggleParent, colors }) {
  return (
    <div
      className="p-5 rounded-xl mb-5"
      style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            checked={!!selected[title]}
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleParent(title)}
          />
          <h4 className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
            {title}
          </h4>
        </div>

        {open ? <ChevronDown color={colors.textSecondary} /> : <ChevronRight color={colors.textSecondary} />}
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-3 mt-5">
          {items.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm"
              style={{ color: colors.textSecondary }}
              onClick={(e) => e.stopPropagation()}
            >
              <input type="checkbox" checked={!!selected[item]} onChange={() => toggleItem(item)} />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
