import React, { useState } from "react";

import colors from "../constants/colors";


const SettingsTabs = ({ onTabChange }) => {
  const tabs = [
    "User Directory",
    "Role Management",
    "Audit Logs",
    "Permissions Matrix",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); 
  };

  return (
    <div className="flex items-center space-x-6 p-4 rounded-xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isActive ? `${colors.accent}33` : "transparent",
              color: isActive ? colors.accent : colors.textSecondary,
              border: `1px solid ${
                isActive ? colors.accent : colors.cardBorder
              }`,
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default SettingsTabs;
