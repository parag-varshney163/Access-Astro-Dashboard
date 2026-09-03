import React from "react";

import colors from "../constants/colors";


const DashBoardCard = ({ title, value, subtitle, icon }) => {
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "16px",
        padding: "24px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "160px",
        transition: "0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.cardBg;
      }}
    >
      {/* Top row: Title + Icon */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="pl-23"
          style={{
            color: colors.textPrimary,
            fontSize: "18px",
            margin: 0,
            fontWeight: 500,
            
          }}
        >
          {title}
        </h3>

        <span style={{ color: colors.accent, fontSize: "20px" }}>{icon}</span>
      </div>

      {/* Large value */}
      <h2
        style={{
          color: colors.textPrimary,
          fontSize: "32px",
          marginTop: "16px",
          fontWeight: 600,
        }}
      >
        {value}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: colors.textSecondary,
          marginTop: "4px",
          fontSize: "14px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default DashBoardCard;

