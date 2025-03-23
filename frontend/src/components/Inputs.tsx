import React from "react";

const Inputs = ({
  placeholder,
  type,
  value,
  onChange,
  required,
}: {
  placeholder: string;
  type: string;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-[450px] h-[50px] rounded-lg p-2 bg-white bg-opacity-60">
      <input
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="w-full h-full bg-transparent outline-none"
      />
    </div>
  );
};

export default Inputs;