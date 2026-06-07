import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withPlate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  withPlate = true,
}) => {
  const imgHeight = {
    sm: "h-7",
    md: "h-9",
    lg: "h-11",
    xl: "h-20",
  }[size];

  const sizeClasses = {
    sm: { container: "px-3 py-1.5 border border-white/10 bg-black/40 backdrop-blur-md rounded-none" },
    md: { container: "px-4 py-2 border border-white/10 bg-[#0A0A0A] rounded-none" },
    lg: { container: "px-6 py-3 border border-white/10 bg-[#0A0A0A] rounded-none shadow-xl" },
    xl: { container: "px-8 py-4 border border-white/10 bg-[#0A0A0A] rounded-none shadow-2xl" },
  };

  const logoContent = (
    <img
      src="/src/assets/images/logo.png"
      alt="Acercons"
      className={`${imgHeight} w-auto object-contain select-none ${className}`}
    />
  );

  if (withPlate) {
    return (
      <div className={sizeClasses[size].container}>
        {logoContent}
      </div>
    );
  }

  return logoContent;
};