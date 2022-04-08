import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import LogIn from "./LogIn/LogIn";
import Registration from "./Registration/Registration";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
