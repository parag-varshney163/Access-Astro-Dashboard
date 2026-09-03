// import { ChevronDown, ChevronRight } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import colors from "../constants/colors";
// export default function PermissionsMatrix() {
//   const [roles, setRoles] = useState([]);
//   const [openDashboard, setOpenDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // Early fallback BEFORE rendering table
//   if (!roles) {
//     return (
//       <div className="py-6 text-center" style={{ color: colors.textSecondary }}>
//         No data found.
//       </div>
//     );
//   }
//   useEffect(() => {
//     loadData();
//   }, []);
//   const loadData = async () => {
//     try {
//       const res = await axiosInstance.get(
//         "/api/v1/access-dashboard/dashboard-permissions-matrix"
//       );
//       setRoles(res.data?.data?.roles || []);
//     } catch (e) {
//       console.error("API Error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const dashboardStructure = {
//     moderationDashboard: [
//       ["Report Dashboard", "report"],
//       ["Moderation Panel", "moderationPanel"],
//       ["Activity Log", "activityLog"],
//       ["Quality Review", "qualityReview"],
//       ["Creator Scores", "creatorScores"],
//       ["Customer Support", "customerSupport"],
//       ["Account Management", "accountManagement"],
//       ["Insights and Metrics", "insightsAndMetrics"],
//       ["Admin Control", "adminControl"],
//     ],
//     operationsDashboard: [
//       ["Find Your Vibe", "findYourVibe"],
//       ["Trending Vibes", "trendingVibes"],
//       ["Call Engagement Hooks", "callEngagementHooks"],
//       ["Audio Call Feed", "audioCallFeed"],
//       ["Scratch Cards", "scratchCards"],
//       ["Virtual Giftings", "virtualGiftings"],
//       ["Games Configuration", "gamesConfiguration"],
//       ["User Levels", "userLevels"],
//       ["Coins Packs", "coinsPack"],
//       ["Pass Management System", "passManagementSystem"],
//       ["Quick Recharge", "quickRecharge"],
//       ["Campaign Pages", "campaignPages"],
//       ["Banners", "banners"],
//       ["Learn and Earn Hub Management", "learnAndHubManagement"],
//       ["Leaderboard Management", "leaderboardManagement"],
//       ["Notification System", "notificationSystem"],
//       ["User Management", "userManagement"],
//     ],
//     creatorOnboardingPayoutsDashboard: [
//       ["Recent Trend", "recentTrends"],
//       ["Creators", "creators"],
//       ["Applications", "applications"],
//       ["KYC Review", "kycReview"],
//       ["User Analytics", "userAnalytics"],
//       ["Payout Request", "payoutRequest"],
//       ["Payouts", "payouts"],
//       ["Website Request","websiteRequest"],
//       ["Alert Dashboard","alertDashboard"],
//       ["Settings", "settings"],
//     ],
//   };
//   const dashboardLabels = {
//     moderationDashboard: "Moderation & Customer Support",
//     operationsDashboard: "Operations",
//     creatorOnboardingPayoutsDashboard: "Creator Onboarding & Payouts",
//   };
//   const toggleOpen = (i) => {
//     setOpenDashboard(openDashboard === i ? null : i);
//   };
//   // Correct lookup
//   const getAccess = (role, dashboardKey, tabKey) => {
//     return role?.permissions?.[dashboardKey]?.[tabKey] === true;
//   };
//   if (loading) {
//     return (
//       <div className="py-6 text-center" style={{ color: colors.textSecondary }}>
//         Loading permissions...
//       </div>
//     );
//   }
//   if (roles.length === 0) {
//     return (
//       <div className="py-6 text-center" style={{ color: colors.textSecondary }}>
//         No roles available.
//       </div>
//     );
//   }
//   return (
//     <div
//       style={{
//         background: colors.primary,
//         padding: "24px",
//         borderRadius: "16px",
//       }}
//     >
//       <h2 style={{ color: colors.textPrimary, fontSize: "24px", fontWeight: 600 }}>
//         Permissions Matrix
//       </h2>
//       {/* Header */}
//       <div
//         style={{
//           marginTop: "20px",
//           display: "grid",
//           gridTemplateColumns: `260px repeat(${roles.length}, 1fr)`,
//           background: colors.secondary,
//           padding: "14px",
//           borderRadius: "10px 10px 0 0",
//         }}
//       >
//         <div style={{ color: colors.textPrimary, fontWeight: 600 }}>
//           Dashboard / Tabs
//         </div>
//         {roles.map((r) => (
//           <div
//             key={r.roleId}
//             style={{
//               textAlign: "center",
//               background: colors.cardBg,
//               padding: "6px 10px",
//               marginLeft: "6px",
//               borderRadius: "8px",
//               color: colors.textPrimary,
//             }}
//           >
//             {r.roleName}
//           </div>
//         ))}
//       </div>
//       {/* Dashboards */}
//       {Object.keys(dashboardStructure).map((dashboardKey, dbIndex) => (
//         <div key={dashboardKey}>
//           {/* Row */}
//           <div
//             onClick={() => toggleOpen(dbIndex)}
//             style={{
//               display: "grid",
//               gridTemplateColumns: `260px repeat(${roles.length}, 1fr)`,
//               padding: "14px",
//               cursor: "pointer",
//               background: colors.cardBg,
//               borderBottom: `1px solid ${colors.cardBorder}`,
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 color: colors.textPrimary,
//                 fontWeight: 600,
//               }}
//             >
//               {openDashboard === dbIndex ? (
//                 <ChevronDown size={18} />
//               ) : (
//                 <ChevronRight size={18} />
//               )}
//               {dashboardLabels[dashboardKey]}
//             </div>
//             {roles.map((role) => {
//               const totalTabs = dashboardStructure[dashboardKey].length;
//               const granted = dashboardStructure[dashboardKey].filter(
//                 ([, tabKey]) => getAccess(role, dashboardKey, tabKey)
//               ).length;
//               return (
//                 <div
//                   key={role.roleId}
//                   style={{
//                     textAlign: "center",
//                     color: colors.success,
//                     fontWeight: 500,
//                   }}
//                 >
//                   {granted}/{totalTabs}
//                 </div>
//               );
//             })}
//           </div>
//           {/* Expanded Tabs */}
//           {openDashboard === dbIndex &&
//             dashboardStructure[dashboardKey].map(([label, tabKey]) => (
//               <div
//                 key={tabKey}
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: `260px repeat(${roles.length}, 1fr)`,
//                   padding: "12px 14px",
//                   background: colors.secondary,
//                   borderBottom: `1px solid ${colors.cardBorder}`,
//                 }}
//               >
//                 <div style={{ color: colors.textSecondary }}>{label}</div>
//                 {roles.map((role) => {
//                   const access = getAccess(role, dashboardKey, tabKey);
//                   return (
//                     <div
//                       key={role.roleId + tabKey}
//                       style={{
//                         textAlign: "center",
//                         color: access ? colors.success : colors.textSecondary,
//                         fontSize: "18px",
//                         fontWeight: access ? 600 : 400,
//                       }}
//                     >
//                       {access ? "✓" : "—"}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// }
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";


export default function PermissionsMatrix() {
  const [roles, setRoles] = useState([]);
  const [openDashboard, setOpenDashboard] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/access-dashboard/dashboard-permissions-matrix"
      );

      setRoles(res.data?.data?.roles || []);
    } catch (e) {
      console.error("API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  // Only Agami Customer Dashboard
  const dashboardStructure = {
    agamiCustomerDashboard: [
      ["Customer Support", "customerSupport"],
      ["Chatbot Template", "chatBotTemplate"],
      ["Account Management", "accountManagement"],
      ["Transactions", "transactions"],
      ["FAQs", "faqs"],
      ["Festivals", "festivals"],
      ["Tutorial Videos", "tutorialVideos"],
      ["Rashifal", "rashifal"],
      ["Notifications", "notifications"],
      ["Data Insights", "dataInsights"],
      ["AutoPay", "autoPay"],
    ],
  };

  const dashboardLabels = {
    agamiCustomerDashboard: "Agami Customer Dashboard",
  };

  const toggleOpen = () => {
    setOpenDashboard((prev) => !prev);
  };

  const getAccess = (role, dashboardKey, tabKey) => {
    return role?.permissions?.[dashboardKey]?.[tabKey] === true;
  };

  if (loading) {
    return (
      <div
        className="py-6 text-center"
        style={{ color: colors.textSecondary }}
      >
        Loading permissions...
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div
        className="py-6 text-center"
        style={{ color: colors.textSecondary }}
      >
        No roles available.
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: colors.primary,
        padding: "24px",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Title */}
      <div className="mb-5">
        <h2
          style={{
            color: colors.textPrimary,
            fontSize: "24px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Permissions Matrix
        </h2>

        <p
          style={{
            color: colors.textSecondary,
            fontSize: "14px",
            marginTop: "6px",
          }}
        >
          Agami Customer Dashboard permissions by role
        </p>
      </div>

      {/* Scroll container */}
      <div
        className="w-full overflow-x-auto"
        style={{
          borderRadius: "12px",
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div
          style={{
            minWidth: `${320 + roles.length * 150}px`,
          }}
        >
          {/* ================= HEADER ================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `320px repeat(${roles.length}, minmax(140px, 1fr))`,
              background: colors.secondary,
              padding: "10px",
              gap: "8px",
              borderBottom: `1px solid ${colors.cardBorder}`,
            }}
          >
            {/* First Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 14px",
                color: colors.textPrimary,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Dashboard / Tabs
            </div>

            {/* Role Headers */}
            {roles.map((role) => (
              <div
                key={role.roleId}
                style={{
                  minWidth: 0,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 8px",
                  background: colors.cardBg,
                  border: `1px solid ${colors.cardBorder}`,
                  borderRadius: "10px",
                  color: colors.textPrimary,
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  boxSizing: "border-box",
                }}
              >
                {role.roleName}
              </div>
            ))}
          </div>

          {/* ================= DASHBOARD ================= */}
          {Object.keys(dashboardStructure).map((dashboardKey) => (
            <div key={dashboardKey}>
              {/* Dashboard Row */}
              <div
                onClick={toggleOpen}
                style={{
                  display: "grid",
                  gridTemplateColumns: `320px repeat(${roles.length}, minmax(140px, 1fr))`,
                  gap: "8px",
                  padding: "10px",
                  cursor: "pointer",
                  background: colors.cardBg,
                  borderBottom: `1px solid ${colors.cardBorder}`,
                  transition: "all 0.2s ease",
                }}
              >
                {/* Dashboard Name */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 14px",
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {openDashboard ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}

                  {dashboardLabels[dashboardKey]}
                </div>

                {/* Permission Summary */}
                {roles.map((role) => {
                  const totalTabs = dashboardStructure[dashboardKey].length;

                  const granted = dashboardStructure[dashboardKey].filter(
                    ([, tabKey]) =>
                      getAccess(role, dashboardKey, tabKey)
                  ).length;

                  return (
                    <div
                      key={role.roleId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color:
                          granted > 0
                            ? colors.success
                            : colors.textSecondary,
                        fontWeight: 600,
                        fontSize: "14px",
                        borderRadius: "8px",
                      }}
                    >
                      {granted}/{totalTabs}
                    </div>
                  );
                })}
              </div>

              {/* ================= TABS ================= */}
              {openDashboard &&
                dashboardStructure[dashboardKey].map(
                  ([label, tabKey]) => (
                    <div
                      key={tabKey}
                      style={{
                        display: "grid",
                        gridTemplateColumns: `320px repeat(${roles.length}, minmax(140px, 1fr))`,
                        gap: "8px",
                        padding: "8px 10px",
                        background: colors.secondary,
                        borderBottom: `1px solid ${colors.cardBorder}`,
                      }}
                    >
                      {/* Tab Name */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 14px",
                          color: colors.textSecondary,
                          fontSize: "14px",
                        }}
                      >
                        {label}
                      </div>

                      {/* Role Access */}
                      {roles.map((role) => {
                        const access = getAccess(
                          role,
                          dashboardKey,
                          tabKey
                        );

                        return (
                          <div
                            key={`${role.roleId}-${tabKey}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: "42px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "8px",
                                background: access
                                  ? colors.successLight
                                  : "transparent",
                                color: access
                                  ? colors.success
                                  : colors.textSecondary,
                                fontSize: "17px",
                                fontWeight: access ? 700 : 400,
                                transition: "all 0.2s ease",
                              }}
                            >
                              {access ? "✓" : "—"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
