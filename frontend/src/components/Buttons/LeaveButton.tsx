import React from "react";

const LeaveButton = ({children, type = "submit", className = "", onClick,}:
                     {children: React.ReactNode;type?: "submit" | "button" | "reset"; className?: string; onClick?: () => void;}) => {
  return (
    <button
      type={type}
      className={`w-full max-w-[450px] h-[50px] rounded-lg bg-white text-black font-bold hover:bg-gray-500 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LeaveButton;
