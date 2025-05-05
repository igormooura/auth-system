import React from "react";

const SubmitButton = ({children, type = "submit", className = "", onClick,}:
                     {children: React.ReactNode;type?: "submit" | "button" | "reset"; className?: string; onClick?: () => void;}) => {
  return (
    <button
      type={type}
      className={`w-full max-w-[450px] h-[50px] rounded-lg bg-cyan-900 text-white font-bold hover:bg-cyan-700 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
