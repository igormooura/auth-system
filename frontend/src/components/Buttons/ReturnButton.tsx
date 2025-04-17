import { TfiBackLeft } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2"
    >
      <TfiBackLeft className="text-xl" />
    
    </button>
  );
};

export default ReturnButton;
