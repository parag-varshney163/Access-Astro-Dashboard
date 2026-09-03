import { motion } from "framer-motion";
import React from "react";

import colors from "../../constants/colors";


const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variants = {
  primary: `text-white`,
  secondary: `text-[${colors.textSecondary}] bg-[${colors.cardBg}] hover:bg-[${colors.hover}]`,
  accent: `bg-[${colors.accent}] text-black hover:brightness-110`,
  danger: `bg-[${colors.danger}] text-white hover:bg-red-700`,
  ghost: `bg-transparent text-white border border-white/20 hover:bg-[${colors.hover}]`,
  custom: "", // ← special case
};

export default function Button({
  children,
  onClick,
  size = "md",
  variant = "primary",
  icon: Icon,
  className = "",
  fullWidth = false,
  motionEffect = true,
  bg,    // custom background color
  text,  // custom text color
  whileHover,
  whileTap,
  ...props
}) {
  const Component = motionEffect ? motion.button : "button";

  const customStyles =
    variant === "custom"
      ? {
          backgroundColor: bg,
          color: text,
        }
      : {};

  return (
    <Component
      whileHover={motionEffect ? { scale: 1.05 } : {}}
      whileTap={motionEffect ? { scale: 0.95 } : {}}
      onClick={onClick}
      style={customStyles} // ← apply custom colors
      className={`
        inline-flex items-center justify-center gap-2 
        font-semibold rounded-full transition-all duration-200
        ${sizes[size]}
        ${variant !== "custom" ? variants[variant] : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Component>
  );
}
