import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/signup" element={<SignUp/>}> </Route>
        <Route path="/home" element= {<Home/>}> </Route>
        <Route path="/edit" element={<Edit/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

