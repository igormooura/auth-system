import useVerifyAuth from "../hooks/verifyAuth";
import DeleteButton from "../components/Buttons/DeleteButton";
import SubmitButton from "../components/Buttons/SubmitButton";

const Home = () => {
  useVerifyAuth();


  const handleDeleteAccount = () => {
    console.log("Conta deletada!");
    alert("Conta deletada com sucesso!");
  };



  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <SubmitButton>Edit Info</SubmitButton>
      <DeleteButton onClick={handleDeleteAccount}>Delete account</DeleteButton>
    </div>
  );
};

export default Home;
