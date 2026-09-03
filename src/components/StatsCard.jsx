import { Users, Key, Activity, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import DashBoardCard from "./DashBoardCard";


export default function StatsCard({reloadKey}) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/access-dashboard/stats");
      setStats(res.data.data);
      
    } catch (err) {
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [reloadKey]);


  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  
  const cardData = [
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      subtitle: "Admin users with access",
      icon: <Users size={22} />,
    },
    {
      title: "Total Roles",
      value: stats.totalRoles,
      subtitle: "Role-based access levels",
      icon: <Key size={22} />,
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions,
      subtitle: "Currently logged in",
      icon: <Activity size={22} />,
    },
    {
      title: "Security Alerts",
      value: stats.securityAlerts,
      subtitle: "Require attention",
      icon: <AlertTriangle size={22} />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
        width: "100%",
        marginTop: "20px",
        textAlign:"center"
      }}
    >
      {cardData.map((item, index) => (
        <DashBoardCard
          key={index}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
