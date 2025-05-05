import React from "react";

const DeleteButton = ({children, type = "button", className = "", onClick,}:
                     {children: React.ReactNode; type?: "submit" | "button" | "reset"; className?: string; onClick?: () => void;}) => {
  return (
    <button
      type={type}
      className={`w-full max-w-[450px] h-[50px] rounded-lg bg-red-600 text-white font-bold hover:bg-red-800 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DeleteButton;