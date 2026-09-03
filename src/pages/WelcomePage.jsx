import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import React from "react";

import Button from "../components/ui/Button";
import colors from "../constants/colors";
import logo from "../assets/logo.webp";


const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
            style={{ background: colors.gradientVertical }}
        >
            {/* Subtle Texture */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
                    backgroundSize: "contain",
                }}
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* Logo */}
                <img
                    src={logo}
                    alt="ChatSpark Logo"
                    width={120}
                    height={120}
                    className="mb-6"
                    loading="lazy"
                />

                {/* Branding */}
                <h1 className="text-[42px] font-bold mb-1">
                    <span style={{ color: colors.textSecondary }}>Chat</span>
                    <span style={{ color: colors.accent }}>Spark</span>
                </h1>

                <p
                    className="text-[28px] font-semibold mb-4"
                    style={{ color: colors.textSecondary }}
                >
                    Welcome To <span style={{ color: colors.accent }}>ChatSpark</span>
                </p>

                {/* Divider */}
                <div
                    className="w-[400px] h-[2px] mb-8"
                    style={{ backgroundColor: colors.accent }}
                />

                {/* Button using reusable component */}
                <Button
                    variant="custom"
                    bg={colors.buttonBg}
                    text={colors.textPrimary}
                    size="lg"
                    onClick={() => navigate("/login")}
                    icon={LogIn}
                    motionEffect={true}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                >
                    Log In
                </Button>

            </motion.div>
        </div>
    );
};

export default WelcomePage;

